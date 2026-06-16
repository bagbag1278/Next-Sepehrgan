import type { Metadata } from "next";
import Login from "@/components/Auth/Login/Login";

export const metadata: Metadata = {
  title: "ورود",
  description: "وارد حساب کاربری رهن کده شوید و به امکانات رزرو ویلا، هتل و آپارتمان دسترسی داشته باشید.",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;