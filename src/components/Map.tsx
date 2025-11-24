import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MapProps {
  sites: Array<{
    id: number;
    name: string;
    description: string;
    role: string;
    lat: number;
    lng: number;
  }>;
}

const Map = ({ sites }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Center on Kolda region
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-14.95, 12.88], // Kolda coordinates
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each site
    sites.forEach(site => {
      if (map.current && site.lat && site.lng) {
        const marker = new mapboxgl.Marker({ color: '#166534' })
          .setLngLat([site.lng, site.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-bold text-sm mb-1">${site.name}</h3>
                  <p class="text-xs text-muted-foreground">${site.description}</p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    Voir l'itinéraire →
                  </a>
                </div>
              `)
          )
          .addTo(map.current);
      }
    });

    setIsTokenSet(true);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isTokenSet) {
    return (
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-muted rounded-xl shadow-inner">
        <div className="max-w-md mx-auto space-y-4">
          <div>
            <h3 className="font-semibold text-card-foreground mb-2">Activer la Carte Interactive</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Pour afficher la carte interactive, vous devez entrer votre token Mapbox public.
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                Obtenir un token gratuit →
              </a>
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Coller votre token Mapbox ici..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={initializeMap}
              disabled={!mapboxToken}
            >
              Activer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="h-64 sm:h-80 lg:h-96 w-full" />
    </div>
  );
};

export default Map;
