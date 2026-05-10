"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  lat: number;
  lng: number;
  houseId: number;
}

const MapRent = ({ lat, lng, houseId }: MapProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="w-full h-[307px] bg-gray-100 rounded-2xl animate-pulse" />
    );

  return (
    <div
      className="w-full h-full  w-full max-w-[710px] border h-[307px] relative border-8 border-white shadow-[0px_10px_20px_rgba(0,94,164,0.2)] 
                            rounded-tl-[50px] rounded-tr-[8px] rounded-br-[50px] rounded-bl-[8px] overflow-hidden z-0F"
    >
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "307px", width: "100%" }} // به جای 100% مقدار ثابت بده
        key={`${lat}-${lng}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>ملک شماره {houseId}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapRent;
