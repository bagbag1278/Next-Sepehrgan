"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" /> }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface HouseLocation {
  id: number;
  title: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  image: string;
}

interface MapComponentProps {
  houses: HouseLocation[];
  selectedHouseId?: number;
  onMarkerClick?: (houseId: number) => void;
  userLocation?: { lat: number; lng: number };
}

const MapComponent = ({ 
  houses, 
  selectedHouseId, 
  onMarkerClick,
  userLocation = { lat: 35.6892, lng: 51.389 }
}: MapComponentProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([userLocation.lat, userLocation.lng]);
  const [mapZoom, setMapZoom] = useState(12);
  const markerRefs = useRef<{ [key: number]: any }>({});

  useEffect(() => {
    if (selectedHouseId) {
      const selectedHouse = houses.find(h => h.id === selectedHouseId);
      if (selectedHouse && selectedHouse.lat && selectedHouse.lng) {
        setMapCenter([selectedHouse.lat, selectedHouse.lng]);
        setMapZoom(15);
        
        setTimeout(() => {
          const marker = markerRefs.current[selectedHouseId];
          if (marker && marker.openPopup) {
            marker.openPopup();
          }
        }, 100);
      }
    }
  }, [selectedHouseId, houses]);

  useEffect(() => {
    if (houses.length > 0) {
      const validHouses = houses.filter(h => h.lat && h.lng);
      if (validHouses.length > 0) {
        const avgLat = validHouses.reduce((sum, h) => sum + h.lat, 0) / validHouses.length;
        const avgLng = validHouses.reduce((sum, h) => sum + h.lng, 0) / validHouses.length;
        setMapCenter([avgLat, avgLng]);
        setMapZoom(13);
      }
    }
  }, [houses]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              className: "custom-div-icon",
              html: `<div class="relative">
                      <div class="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute"></div>
                      <div class="w-4 h-4 bg-blue-500 rounded-full relative"></div>
                    </div>`,
              iconSize: [20, 20],
              popupAnchor: [0, -10],
            })}
          >
            <Popup>
              <div className="text-center p-1">
                <p className="font-bold text-sm">موقعیت شما</p>
                <p className="text-xs text-gray-600">شما اینجا هستید</p>
              </div>
            </Popup>
          </Marker>
        )}

        {houses.map((house) => {
          if (!house.lat || !house.lng) return null;
          
          const isSelected = selectedHouseId === house.id;
          
          return (
            <Marker
              key={house.id}
              position={[house.lat, house.lng]}
              ref={(ref) => {
                if (ref) markerRefs.current[house.id] = ref;
              }}
              eventHandlers={{
                click: () => {
                  if (onMarkerClick) {
                    onMarkerClick(house.id);
                  }
                },
              }}
              icon={L.divIcon({
                className: "custom-marker",
                html: `<div class="relative group">
                        <div class="w-8 h-8 ${isSelected ? 'bg-red-500 scale-125' : 'bg-blue-500'} rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        ${isSelected ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>' : ''}
                      </div>`,
                iconSize: [32, 32],
                popupAnchor: [0, -16],
              })}
            >
              <Popup>
                <div className="min-w-[200px] p-2">
                  <img 
                    src={house.image} 
                    alt={house.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-bold text-sm mb-1">{house.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">{house.address}</p>
                  <p className="text-blue-500 font-bold text-sm">
                    {house.price.toLocaleString()} تومان
                  </p>
                  <button
                    onClick={() => {
                      if (onMarkerClick) {
                        onMarkerClick(house.id);
                        const element = document.getElementById(`house-${house.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }
                    }}
                    className="mt-2 w-full px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

    </div>
  );
};

export default MapComponent;