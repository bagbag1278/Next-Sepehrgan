// components/MapComponent.tsx
"use client";
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix für Leaflet Icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  officeInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    rating?: number;
  };
}

const MapComponent = ({ officeInfo }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // مختصات دفتر مرکزی در تهران (Tehran Grand Bazaar area)
  const tehranOfficeCoords: [number, number] = [35.6892, 51.3890];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // ایجاد نقشه
    mapInstanceRef.current = L.map(mapRef.current).setView(tehranOfficeCoords, 14);

    // اضافه کردن لایه نقشه (Tile Layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // نشانگر مخصوص دفتر مرکزی
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative">
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
        </div>
      `,
      iconSize: [48, 48],
      popupAnchor: [0, -24],
    });

    // نشانگر عادی برای مناطق اطراف
    const marker = L.marker(tehranOfficeCoords, { icon: customIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <div class="text-right p-2 min-w-[200px]">
          <h3 class="font-bold text-blue-600 mb-1">🏢 ${officeInfo?.name || 'دفتر مرکزی رهن کده'}</h3>
          <p class="text-sm text-gray-600 mb-1">📍 ${officeInfo?.address || 'تهران، خیابان ولیعصر'}</p>
          <p class="text-sm text-gray-600 mb-1">📞 ${officeInfo?.phone || '۰۲۱-۸۸۷۶۵۴۳۲'}</p>
          <p class="text-sm text-gray-600">✉️ ${officeInfo?.email || 'info@rahnkadeh.com'}</p>
          <div class="mt-2 pt-2 border-t border-gray-200">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${tehranOfficeCoords[0]},${tehranOfficeCoords[1]}" 
               target="_blank" 
               class="text-blue-500 text-sm font-bold hover:underline">
              🚗 مسیریابی به این مکان
            </a>
          </div>
        </div>
      `)
      .openPopup();

    // اضافه کردن دایره اطراف دفتر مرکزی
    L.circle(tehranOfficeCoords, {
      color: '#0887CA',
      fillColor: '#0887CA',
      fillOpacity: 0.1,
      radius: 500,
      weight: 2,
    }).addTo(mapInstanceRef.current);

    // اضافه کردن بعضی نقاط دیدنی تهران
    const pointsOfInterest = [
      { name: 'برج میلاد', coords: [35.7447, 51.3753] },
      { name: 'برج آزادی', coords: [35.6995, 51.3376] },
      { name: 'پل طبیعت', coords: [35.7543, 51.4166] },
    ];

    pointsOfInterest.forEach(poi => {
      const poiIcon = L.divIcon({
        className: 'poi-marker',
        html: `<div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">⭐</div>`,
        iconSize: [24, 24],
      });
      
      L.marker(poi.coords as [number, number], { icon: poiIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`<div class="text-center"><strong>${poi.name}</strong><br>نقطه دیدنی تهران</div>`);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-tl-[42px] rounded-br-[42px]" style={{ minHeight: '400px' }} />
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-xs text-gray-500">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          © OpenStreetMap
        </a>
      </div>
    </div>
  );
};

export default MapComponent;