"use client";
import React from "react";
import LocationSlider from "./components/LocationSlider";
import ContactMap from "./components/ContactMap";
import ContactForm from "./components/ContactForm";
import ContactInfoCards from "./components/ContactInfoCards";
import BuildTogether from "./components/BuildTogether";
import HeroSection from "./components/HeroSection";
import OfficeInfo from "./components/OfficeInfo";

const officeInfo = {
  name: "دفتر مرکزی رهن کده",
  address: "تهران، خیابان ولیعصر، تقاطع خیابان ملاصدرا، پلاک ۱۲۳",
  phone: "۰۲۱-۸۸۷۶۵۴۳۲",
  email: "info@rahnkadeh.com",
  rating: 4.8,
  lat: 35.7596,
  lng: 51.4007,
  reviews: 127,
  hours: "شنبه تا چهارشنبه ۹ صبح تا ۶ عصر"
};

const ContactUsClient = () => {
  return (
    <div className="w-full min-h-screen pb-20 font-sans overflow-x-hidden" dir="rtl">
      <HeroSection />
      <LocationSlider />
      <BuildTogether />
      <ContactInfoCards />

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 max-[1300px]:gap-20 px-6">
        <ContactForm />
        <ContactMap 
          name={officeInfo.name}
          address={officeInfo.address}
          phone={officeInfo.phone}
          email={officeInfo.email}
          rating={officeInfo.rating}
          lat={officeInfo.lat}
          lng={officeInfo.lng}
        />
      </section>
      
      <OfficeInfo
        rating={officeInfo.rating}
        reviews={officeInfo.reviews}
        hours={officeInfo.hours}
        address={officeInfo.address}
        lat={officeInfo.lat}
        lng={officeInfo.lng}
        name={officeInfo.name}
      />
    </div>
  );
};

export default ContactUsClient;