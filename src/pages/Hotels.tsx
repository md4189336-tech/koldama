import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { Map } from 'lucide-react';
import { KoldaImage } from '@/components/KoldaImage';
import { StatusView } from '@/components/StatusView';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import MapView, { type MapPoint } from '@/components/Map';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { koldaMedia } from '@/lib/koldaMedia';

type Establishment = Tables<'establishments'>;

const emptyForm = {
  name: '',
  type: 'Auberge',
  description: '',
  amenities: '',
  phone: '',
  whatsapp: '',
  address: '',
  latitude: '',
  longitude: '',
  image_url: '',
};

const Hotels = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  const loadEstablishments = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('establishments')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    setEstablishments(data ?? []);
    setError(fetchError ? 'Les hébergements ne sont pas disponibles pour le moment.' : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadEstablishments();
  }, [loadEstablishments]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setNotice('');

    const { error: submitError } = await supabase.from('establishments').insert({
      name: formData.name.trim(),
      type: formData.type,
      description: formData.description.trim(),
      amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.replace(/\D/g, ''),
      address: formData.address.trim(),
      latitude: formData.latitude ? Number(formData.latitude) : null,
      longitude: formData.longitude ? Number(formData.longitude) : null,
      image_url: formData.image_url.trim() || null,
      status: 'pending_approval',
    });

    setSubmitting(false);
    if (submitError) {
      setNotice('Envoi impossible. Vérifiez votre connexion puis réessayez.');
      return;
    }

    setFormData(emptyForm);
    setFormOpen(false);
    setNotice('Votre établissement a été transmis pour validation.');
  };

  const mapPoints: MapPoint[] = useMemo(() => establishments
    .filter(item => item.latitude !== null && item.longitude !== null)
    .map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      lat: item.latitude as number,
      lng: item.longitude as number,
      image: item.image_url,
      role: item.type,
    })), [establishments]);

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 text-accent">
        Hôtels et Hébergements à Kolda
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-6">
        Découvrez les établissements validés et contactez-les directement.
      </p>

      <div className="relative mb-6 h-40 sm:h-56 overflow-hidden rounded-lg">
        <KoldaImage src={koldaMedia.accommodationStreet} alt="Rue de Kolda, près des hébergements" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 to-transparent p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Séjourner au cœur du Fouladou</h3>
        </div>
      </div>

      <StatusView loading={loading} error={error} />
      {mapPoints.length > 0 && <MapView sites={mapPoints} />}

      {!loading && !error && establishments.length === 0 && (
        <p className="border-y border-border py-8 text-center text-muted-foreground">
          Aucun hébergement n’a encore été publié.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {establishments.map(establishment => (
          <article key={establishment.id} className="overflow-hidden rounded-lg bg-card shadow-lg">
            <KoldaImage
              src={establishment.image_url || koldaMedia.accommodationStreet}
              alt={establishment.name}
              className="h-40 sm:h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase text-accent">{establishment.type}</p>
              <h3 className="mb-2 text-lg sm:text-xl font-bold text-card-foreground">{establishment.name}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{establishment.description}</p>
              <p className="mb-3 text-xs text-muted-foreground">{establishment.address}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {establishment.amenities.map(amenity => (
                  <span key={amenity} className="rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground">{amenity}</span>
                ))}
              </div>
              <p className="mb-3 text-sm text-muted-foreground">Contact : {establishment.phone}</p>
              <WhatsAppButton number={establishment.whatsapp} className="w-full" />
            </div>
          </article>
        ))}
      </div>

      <section className="mt-8 border-t border-border py-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-foreground">Vous gérez un hébergement à Kolda ?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Les nouvelles fiches sont publiées après modération.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormOpen(open => !open)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground"
          >
            <Map className="h-4 w-4" /> Ajouter votre établissement
          </button>
        </div>

        {notice && <p role="status" className="mt-4 text-sm text-primary">{notice}</p>}

        {formOpen && (
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <label className="space-y-1 text-sm font-medium">Nom de l’établissement
              <input required minLength={2} maxLength={120} value={formData.name} onChange={event => setFormData({ ...formData, name: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium">Type
              <select value={formData.type} onChange={event => setFormData({ ...formData, type: event.target.value })} className="w-full rounded-md border border-border bg-background p-2">
                <option>Hôtel</option><option>Auberge</option><option>Résidence</option><option>Maison d’hôtes</option>
              </select>
            </label>
            <label className="space-y-1 text-sm font-medium sm:col-span-2">Description
              <textarea required minLength={10} maxLength={1200} rows={3} value={formData.description} onChange={event => setFormData({ ...formData, description: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium">Téléphone
              <input required type="tel" value={formData.phone} onChange={event => setFormData({ ...formData, phone: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium">WhatsApp (indicatif inclus)
              <input required type="tel" pattern="[+0-9 ()-]{9,24}" value={formData.whatsapp} onChange={event => setFormData({ ...formData, whatsapp: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium sm:col-span-2">Adresse
              <input required minLength={3} maxLength={200} value={formData.address} onChange={event => setFormData({ ...formData, address: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium">Latitude
              <input type="number" min="-90" max="90" step="any" value={formData.latitude} onChange={event => setFormData({ ...formData, latitude: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium">Longitude
              <input type="number" min="-180" max="180" step="any" value={formData.longitude} onChange={event => setFormData({ ...formData, longitude: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium">Services (séparés par des virgules)
              <input value={formData.amenities} onChange={event => setFormData({ ...formData, amenities: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <label className="space-y-1 text-sm font-medium">URL de la photo
              <input type="url" value={formData.image_url} onChange={event => setFormData({ ...formData, image_url: event.target.value })} className="w-full rounded-md border border-border bg-background p-2" />
            </label>
            <button disabled={submitting} className="rounded-md bg-accent px-4 py-3 font-semibold text-accent-foreground disabled:opacity-60 sm:col-span-2">
              {submitting ? 'Envoi…' : 'Soumettre pour validation'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Hotels;