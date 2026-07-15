"use client";
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface MapComponentProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  rating?: number;
  lat?: number;
  lng?: number;
}

const MapComponent = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-tl-[42px] rounded-br-[42px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0887CAB2] mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">در حال بارگذاری نقشه...</p>
        </div>
      </div>
    )
  }
);

const ContactMap = memo(({ name, address, phone, email, rating, lat, lng }: MapComponentProps) => {
  const mapComponent = useMemo(() => (
    <MapComponent 
      name={name}
      address={address}
      phone={phone}
      email={email}
      rating={rating}
      lat={lat}
      lng={lng}
    />
  ), [name, address, phone, email, rating, lat, lng]);

  return (
    <AdvancedScrollAnimation type="slide-left" delay={0.2} duration={0.6}>
      <div className="rounded-tl-[42px] rounded-br-[42px] z-10 overflow-hidden shadow-lg border-8 border-white dark:border-gray-800 w-full h-[500px] bg-white dark:bg-gray-800">
        {mapComponent}
      </div>
    </AdvancedScrollAnimation>
  );
});

ContactMap.displayName = 'ContactMap';

export default ContactMap;