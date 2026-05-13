"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  locationId: number;
  houseId: number;
  lat?: number;     
  lng?: number;
} 

const MapRent = ({ locationId, houseId, lat, lng }: MapProps) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [icon, setIcon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        // اتصال مستقیم به API که دادی
        const response = await fetch(`http://next.genzuni.website/api/locations/${locationId}`);
        
        if (!response.ok) throw new Error("خطا در پاسخ سرور");

        const data = await response.json();
        console.log("دیتای دریافتی از لوکیشن:", data);

        if (data.lat && data.lng) {
          setCoords({
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
          });
        }
      } catch (error) {
        console.error("اتصال به API لوکیشن برقرار نشد:", error);
      } finally {
        setLoading(false);
      }
    };

    const L = require("leaflet");
    const customIcon = new L.Icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    setIcon(customIcon);

    if (locationId) fetchLocation();
  }, [locationId]);
  if (loading || !coords) {
    return <div className="w-full h-[307px] bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl">در حال اتصال به نقشه...</div>;
  }

  return (
    <div className="w-[694px] h-[307px] relative rounded-2xl rounded-tl-[50px] rounded-br-[50px] overflow-hidden border-8 dark:border-[#0d084f]  border-white shadow-lg z-0">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        key={`${coords.lat}-${coords.lng}`}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coords.lat, coords.lng]} icon={icon}>
          <Popup>آی‌دی ملک: {houseId}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapRent;