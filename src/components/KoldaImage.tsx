import { useEffect, useState, type ImgHTMLAttributes } from 'react';
import { Landmark } from 'lucide-react';

type KoldaImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  fallbackIcon?: typeof Landmark;
};

export const KoldaImage = ({ src, alt = '', className = '', onError, fallbackIcon: Icon = Landmark, ...props }: KoldaImageProps) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div role="img" aria-label={`${alt || 'Photo de Kolda'} (photo indisponible)`} className={`flex items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950 text-white/80 ${className}`}>
        <Icon aria-hidden="true" className="h-10 w-10" />
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={event => {
        onError?.(event);
        setFailed(true);
      }}
    />
  );
};