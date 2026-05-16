import { cookies } from "next/headers";
import MultiStepForm from "@/components/Auth/register/MultiStepForm";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const tempUserIdCookie = cookieStore.get("tempUserId")?.value;

  // تبدیل به عدد و بررسی وجود
  const tempUserId = tempUserIdCookie ? Number(tempUserIdCookie) : null;

  return (
    <div dir="rtl">
      <MultiStepForm initialTempUserId={tempUserId} />
    </div>
  );
}
