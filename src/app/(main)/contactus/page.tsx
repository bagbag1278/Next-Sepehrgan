
import ContactUsClient from "@/components/ContactUs/ContactUsClient"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "تماس با ما",
  description: "با دفتر مرکزی رهن کده در تهران تماس بگیرید. آدرس، شماره تماس و فرم ارسال پیام.",
  openGraph: {
    title: "تماس با ما",
    description: "با دفتر مرکزی رهن کده در تهران تماس بگیرید.",
    type: "website",
  },
};
const ContactUs = () => {
  return (
    <>
      <ContactUsClient />
    </>
  )
}

export default ContactUs


