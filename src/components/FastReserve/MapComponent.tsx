"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

let L: any = null;

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          در حال بارگذاری نقشه...
        </div>
      </div>
    ),
  },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

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
  userLocation = { lat: 35.6892, lng: 51.389 },
}: MapComponentProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    userLocation.lat,
    userLocation.lng,
  ]);
  const [mapZoom, setMapZoom] = useState(12);
  const markerRefs = useRef<{ [key: number]: any }>({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const loadLeaflet = async () => {
      const leaflet = await import("leaflet");
      L = leaflet;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      await import("leaflet/dist/leaflet.css");

      setLeafletLoaded(true);
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedHouseId && leafletLoaded && L) {
      const selectedHouse = houses.find((h) => h.id === selectedHouseId);
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
  }, [selectedHouseId, houses, leafletLoaded]);

  useEffect(() => {
    if (houses.length > 0 && leafletLoaded && L) {
      const validHouses = houses.filter((h) => h.lat && h.lng);
      if (validHouses.length > 0) {
        const avgLat =
          validHouses.reduce((sum, h) => sum + h.lat, 0) / validHouses.length;
        const avgLng =
          validHouses.reduce((sum, h) => sum + h.lng, 0) / validHouses.length;
        setMapCenter([avgLat, avgLng]);
        setMapZoom(13);
      }
    }
  }, [houses, leafletLoaded]);

  if (!isMounted || !leafletLoaded || !L) {
    return (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          در حال بارگذاری نقشه...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        className="z-0 rounded-lg"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url={
            isDarkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {houses.map((house) => {
          if (!house.lat || !house.lng || !L) return null;

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
                        <div class="w-6 h-6 sm:w-8 sm:h-8 ${isSelected ? "bg-red-500 scale-125" : "bg-blue-500"} rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer">
                          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        ${isSelected ? '<div class="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-ping"></div>' : ""}
                      </div>`,
                iconSize: [32, 32],
                popupAnchor: [0, -16],
              })}
            >
              <Popup>
                <div className="relative w-[180px] sm:w-[220px] p-3 dark:bg-gray-800 dark:text-white rounded-lg">
                  <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={"/auth/img.png"}
                      width={324}
                      height={200}
                      alt="img"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm mb-1 dark:text-white line-clamp-2">
                    {house.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                    {house.address}
                  </p>
                  <p className="text-blue-500 dark:text-blue-400 font-bold text-xs sm:text-sm">
                    {house.price.toLocaleString()} تومان
                  </p>
                  <Link
                    href={`/housereserve/HouseReserveDetails/${house.id}`}
                    className="block mt-2"
                  >
                    <button
                      onClick={() => {
                        if (onMarkerClick) {
                          onMarkerClick(house.id);
                          const element = document.getElementById(
                            `house-${house.id}`,
                          );
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }
                        }
                      }}
                      className="w-full px-2 sm:px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[10px] sm:text-xs rounded-lg transition-colors duration-200"
                    >
                      مشاهده جزئیات
                    </button>
                  </Link>
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