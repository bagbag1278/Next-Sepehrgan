import { ReactNode } from "react";
import AdminLayoutClient from "./AdminLayoutClient";
import { getUserInfo } from "@/core/token/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const userData = await getUserInfo();

  return (
    <AdminLayoutClient userData={userData}>
      {children}
    </AdminLayoutClient>
  );
}
