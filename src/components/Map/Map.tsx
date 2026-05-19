"use client";

import { useEffect, useRef } from "react";

interface MapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  popupText?: string;
  height?: string;
  apiKey: string;
}

export default function Map({
  lat,
  lng,
  zoom = 13,
  popupText = "موقعیت انتخاب شده",
  height = "400px",
  apiKey,
}: MapProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // اطمینان از اینکه SDK بارگذاری شده و پنجره (window) در دسترس است
    if (
      typeof (window as any).L !== "undefined" &&
      lat != null &&
      lng != null &&
      apiKey
    ) {
      // ایجاد نقشه نشان
      const neshanMap = new (window as any).NeshanMap({
        key: apiKey, // کلید API
        mapid: "map", // آی‌دی div که نقشه در آن رندر می‌شود
        lat: lat,
        lng: lng,
        zoom: zoom,
        // you can add more options here based on Neshan Docs
      });
      mapRef.current = neshanMap; // ذخیره آبجکت نقشه

      // اضافه کردن مارکر
      const marker = new (window as any).NeshanMap.Marker({
        position: {
          latitude: lat,
          longitude: lng,
        },
      }).addTo(neshanMap);
      markerRef.current = marker;

      return () => {
        if (mapRef.current) {
        }
      };
    }
  }, [lat, lng, zoom, apiKey]);

  if (lat == null || lng == null || !apiKey) {
    return (
      <div className="text-center" style={{ height }}>
        {apiKey ? "مختصات نقشه موجود نیست" : "کلید API نشان وارد نشده است"}
      </div>
    );
  }

  return <div id="map" style={{ width: "100%", height: height }}></div>;
}
