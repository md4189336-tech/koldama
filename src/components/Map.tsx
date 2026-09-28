import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
});

export interface MapPoint {
  id: string | number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  image?: string | null;
  role?: string;
}

interface MapProps {
  sites: MapPoint[];
}

const Map = ({ sites }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = L.map(mapContainer.current, { scrollWheelZoom: false }).setView([12.8833, -14.95], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    sites.filter(site => Number.isFinite(site.lat) && Number.isFinite(site.lng)).forEach(site => {
      const popup = document.createElement('div');
      popup.className = 'kolda-map-popup';

      if (site.image) {
        const image = document.createElement('img');
        image.src = site.image;
        image.alt = site.name;
        image.style.width = '200px';
        image.style.maxHeight = '120px';
        image.style.objectFit = 'cover';
        image.style.marginBottom = '8px';
        image.onerror = () => {
          image.remove();
        };
        popup.append(image);
      }

      const title = document.createElement('strong');
      title.textContent = site.name;
      title.style.display = 'block';
      popup.append(title);

      const description = document.createElement('p');
      description.textContent = site.description;
      description.style.margin = '4px 0 8px';
      popup.append(description);

      const directions = document.createElement('a');
      directions.href = `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`;
      directions.target = '_blank';
      directions.rel = 'noopener noreferrer';
      directions.textContent = 'Itinéraire Google Maps';
      popup.append(directions);

      L.marker([site.lat, site.lng]).bindPopup(popup).addTo(map);
    });

    if (sites.length > 1) {
      map.fitBounds(sites.map(site => [site.lat, site.lng] as [number, number]), { padding: [24, 24], maxZoom: 12 });
    }

    return () => {
      map.remove();
    };
  }, [sites]);

  return (
    <div className="mb-6 sm:mb-8 overflow-hidden rounded-lg shadow-lg">
      <div ref={mapContainer} className="h-72 sm:h-96 w-full" aria-label="Carte interactive de Kolda" />
    </div>
  );
};

export default Map;