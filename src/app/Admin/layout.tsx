import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ReactNode } from "react";
import AdminLayoutClient from "./AdminLayoutClient";

async function getUserInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as any;
    
    if (!decoded) return null;
    
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      phone: decoded.phone || "",
      role: decoded.role,
      profilePicture: decoded.profilePicture,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const userData = await getUserInfo();

  return (
    <AdminLayoutClient userData={userData}>
      {children}
    </AdminLayoutClient>
  );
}