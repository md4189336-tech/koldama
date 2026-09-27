CREATE TYPE public.establishment_status AS ENUM ('pending_approval', 'approved', 'rejected');
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.establishments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  type text NOT NULL CHECK (char_length(type) BETWEEN 2 AND 60),
  description text NOT NULL CHECK (char_length(description) BETWEEN 10 AND 1200),
  amenities text[] NOT NULL DEFAULT '{}',
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 24),
  whatsapp text NOT NULL CHECK (whatsapp ~ '^[0-9]{9,15}$'),
  address text NOT NULL CHECK (char_length(address) BETWEEN 3 AND 200),
  latitude double precision CHECK (latitude BETWEEN -90 AND 90),
  longitude double precision CHECK (longitude BETWEEN -180 AND 180),
  image_url text CHECK (image_url IS NULL OR char_length(image_url) <= 1000),
  status public.establishment_status NOT NULL DEFAULT 'pending_approval',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.establishments TO anon, authenticated;
GRANT ALL ON public.establishments TO service_role;
ALTER TABLE public.establishments ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Public can view approved establishments"
ON public.establishments FOR SELECT
TO anon, authenticated
USING (status = 'approved' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can propose establishments"
ON public.establishments FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending_approval');

CREATE POLICY "Admins can moderate establishments"
ON public.establishments FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_establishments_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER establishments_updated_at
BEFORE UPDATE ON public.establishments
FOR EACH ROW EXECUTE FUNCTION public.set_establishments_updated_at();