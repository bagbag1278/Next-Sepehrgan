"use client";

import React, { useState, useEffect } from "react";

interface MapRentProps {
  locationId: number;
  houseId: number;
  lat?: number | string;
  lng?: number | string;
}

const MapRent = ({ locationId, houseId, lat, lng }: MapRentProps) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (lat && lng) {
        setCoords({
          lat: typeof lat === "string" ? parseFloat(lat) : lat,
          lng: typeof lng === "string" ? parseFloat(lng) : lng,
        });
        setLoading(false);
      } else {
        setError("مختصات ملک یافت نشد");
        setLoading(false);
      }
    };
    fetchLocation();
  }, [locationId, lat, lng]);

  if (loading) {
    return (
      <div className="w-full h-[407px] bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl ">
        <span className="text-gray-500">در حال بارگذاری نقشه...</span>
      </div>
    );
  }

  if (error || !coords) {
    return (
      <div className="w-full h-[307px] bg-gray-100 flex items-center justify-center rounded-2xl">
        <span className="text-gray-500">
          {error || "موقعیت مکانی موجود نیست"}
        </span>
      </div>
    );
  }

  const mapSrc = `https://nshn.ir/embed?lat=${coords.lat}&lng=${coords.lng}&z=15&p=1`;

  return (
    <div className="flex justify-center w-full ">
          <div className="w-full h-[507px] max-[888]:w-90 max-[888]:h-120   relative rounded-2xl rounded-tl-[50px] rounded-br-[50px] overflow-hidden border-8 dark:border-[#0d084f] border-white shadow-lg">
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="نقشه نشان"
        className="rounded-2xl"
      />
    </div>
    </div>

  );
};

export default MapRent;
