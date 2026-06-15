import type { Metadata } from "next";
import ContactUs from "../../../components/ContactUs/ContactUs";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "با دفتر مرکزی رهن کده در تهران تماس بگیرید. آدرس، شماره تماس و فرم ارسال پیام.",
  openGraph: {
    title: "تماس با ما",
    description: "با دفتر مرکزی رهن کده در تهران تماس بگیرید.",
    type: "website",
  },
};

const ContactPage = () => {
  return <ContactUs />;
};

export default ContactPage;