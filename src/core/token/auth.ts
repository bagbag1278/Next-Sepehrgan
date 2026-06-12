import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: number;
  email: string;
  role: string;
  name: string;
  profilePicture: string | null;
}

export async function getUserInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  const decoded = jwt.decode(token) as DecodedToken | null;

  if (!decoded) return null;

  if (!decoded.exp) return null;

  const isExpired = decoded.exp * 1000 < Date.now();

  if (isExpired) {
    return null;
  }

  return decoded;
}
