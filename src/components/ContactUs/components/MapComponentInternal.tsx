"use client";
import { useEffect, useRef, memo } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentInternalProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  rating?: number;
  lat?: number;
  lng?: number;
}

const MapComponentInternal = memo(({ name, address, phone, email, lat, lng }: MapComponentInternalProps) => {
  const t = useTranslations('MapComponent');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { resolvedTheme } = useTheme();

  const coords: [number, number] = [lat || 35.6892, lng || 51.3890];

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const tileUrl = resolvedTheme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    const attribution = resolvedTheme === 'dark'
      ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    mapInstanceRef.current = L.map(mapRef.current).setView(coords, 13);

    L.tileLayer(tileUrl, {
      attribution: attribution,
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative">
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
        </div>
      `,
      iconSize: [48, 48],
      popupAnchor: [0, -24],
    });

    const popupBgColor = resolvedTheme === 'dark' ? '#1f2937' : '#ffffff';
    const popupTextColor = resolvedTheme === 'dark' ? '#f3f4f6' : '#1f2937';
    const borderColor = resolvedTheme === 'dark' ? '#374151' : '#e5e7eb';

    L.marker(coords, { icon: customIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <div style="
          direction: rtl;
          padding: 12px;
          min-width: 220px;
          background-color: ${popupBgColor};
          color: ${popupTextColor};
          border-radius: 12px;
          font-family: system-ui, sans-serif;
        ">
          <h3 style="font-weight: bold; color: #0887CA; margin-bottom: 8px; font-size: 16px;">
            🏢 ${name || t('officeName')}
          </h3>
          <p style="margin-bottom: 6px; font-size: 13px;">📍 ${address || t('officeAddress')}</p>
          <p style="margin-bottom: 6px; font-size: 13px;">📞 ${phone || t('officePhone')}</p>
          <p style="margin-bottom: 10px; font-size: 13px;">✉️ ${email || t('officeEmail')}</p>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid ${borderColor}">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}" 
               target="_blank" 
               style="color: #3b82f6; font-size: 13px; font-weight: bold; text-decoration: none; display: flex; align-items: center; gap: 4px; justify-content: center;">
              🚗 ${t('navigateToLocation')}
            </a>
          </div>
        </div>
      `);

    L.circle(coords, {
      color: '#0887CA',
      fillColor: '#0887CA',
      fillOpacity: 0.1,
      radius: 500,
      weight: 2,
    }).addTo(mapInstanceRef.current);

    L.control.scale({ metric: true, imperial: false, position: 'bottomleft' }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [resolvedTheme, name, address, phone, email, coords, t]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-tl-[42px] rounded-br-[42px]" style={{ minHeight: '400px' }} />
      <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-1 px-2 text-[10px] text-gray-500 dark:text-gray-400">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          © OpenStreetMap
        </a>
      </div>
    </div>
  );
});

MapComponentInternal.displayName = 'MapComponentInternal';

export default MapComponentInternal;