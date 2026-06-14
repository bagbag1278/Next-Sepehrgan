"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Maximize2, AlertCircle } from 'lucide-react';

// Fix برای آیکون‌های Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapRentProps {
  locationId?: number;
  houseId?: number;
  lat?: number | string;
  lng?: number | string;
  address?: string;
  areaName?: string;
}

const MapRent = ({ locationId, houseId, lat, lng, address, areaName }: MapRentProps) => {
  const t = useTranslations('MapRent');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // اعتبارسنجی مختصات
  const isValidCoordinates = (latVal: number, lngVal: number): boolean => {
    return !isNaN(latVal) && !isNaN(lngVal) && latVal >= -90 && latVal <= 90 && lngVal >= -180 && lngVal <= 180;
  };

  // دریافت مختصات نهایی
  const getFinalCoords = (): { lat: number; lng: number } => {
    let finalLat = 35.6892; // تهران پیشفرض
    let finalLng = 51.3890;
    
    if (lat && lng) {
      const parsedLat = typeof lat === "string" ? parseFloat(lat) : lat;
      const parsedLng = typeof lng === "string" ? parseFloat(lng) : lng;
      if (isValidCoordinates(parsedLat, parsedLng)) {
        finalLat = parsedLat;
        finalLng = parsedLng;
      }
    }
    
    return { lat: finalLat, lng: finalLng };
  };

  const coords = getFinalCoords();
  const displayAddress = areaName || address || t('unknownLocation');

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // ایجاد نقشه
    mapInstanceRef.current = L.map(mapRef.current).setView([coords.lat, coords.lng], 14);

    // اضافه کردن لایه نقشه
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // آیکون سفارشی
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

    // نشانگر اصلی
    L.marker([coords.lat, coords.lng], { icon: customIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <div class="text-right p-2 min-w-[200px]">
          <h3 class="font-bold text-blue-600 mb-1">🏠 ${t('propertyLocation')}</h3>
          <p class="text-sm text-gray-600 mb-1">📍 ${displayAddress}</p>
          <p class="text-xs text-gray-500 mb-1">
            ${coords.lat.toFixed(4)} , ${coords.lng.toFixed(4)}
          </p>
          <div class="mt-2 pt-2 border-t border-gray-200">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}" 
               target="_blank" 
               class="text-blue-500 text-sm font-bold hover:underline">
              🚗 ${t('openInGoogleMaps')}
            </a>
          </div>
        </div>
      `);

    // دایره اطراف موقعیت
    L.circle([coords.lat, coords.lng], {
      color: '#0887CA',
      fillColor: '#0887CA',
      fillOpacity: 0.1,
      radius: 500,
      weight: 2,
    }).addTo(mapInstanceRef.current);

    setIsMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coords.lat, coords.lng]);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
    window.open(url, '_blank');
  };

  const centerMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([coords.lat, coords.lng], 15);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl mx-auto">
        {/* Address Bar */}
        <div className="mb-3 flex items-center justify-between gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500 flex-shrink-0" />
            <span className="truncate dark:text-gray-300">{displayAddress}</span>
          </div>
          <button
            onClick={centerMap}
            className="flex items-center gap-1 px-2 py-1 text-xs text-blue-500 hover:text-blue-600 transition"
            title={t('centerMap')}
          >
            <Maximize2 size={14} />
          </button>
        </div>
        
        {/* Map Container */}
        <div className="relative w-full h-[407px] max-[888px]:h-[320px] rounded-2xl rounded-tl-[50px] rounded-br-[50px] overflow-hidden border-8 dark:border-gray-700 border-white shadow-2xl group">
          <div ref={mapRef} className="w-full h-full rounded-2xl rounded-tl-[50px] rounded-br-[50px]" style={{ minHeight: '400px' }} />
          
          {/* Attribution */}
          <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-2 py-1 text-[10px] text-gray-500 z-20">
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              © OpenStreetMap
            </a>
          </div>
        </div>
        
        {/* Map Actions */}
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={openInGoogleMaps}
            className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow text-xs font-medium text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition border border-gray-200 dark:border-gray-700"
          >
            <Navigation size={14} className="text-blue-500" />
            {t('openInGoogleMaps')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapRent;