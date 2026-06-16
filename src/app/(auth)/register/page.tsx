import { cookies } from "next/headers";
import MultiStepForm from "@/components/Auth/register/MultiStepForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ثبت‌نام",
  description: "در رهن کده ثبت‌نام کنید و به رزرو آنلاین ویلا، هتل و آپارتمان دسترسی داشته باشید.",
};
export default async function RegisterPage() {
  const cookieStore = await cookies();
  const tempUserIdCookie = cookieStore.get("tempUserId")?.value;
  const tempUserId = tempUserIdCookie ? Number(tempUserIdCookie) : null;

  return (
    <div dir="rtl">
      <MultiStepForm initialTempUserId={tempUserId} />
    </div>
  );
}
