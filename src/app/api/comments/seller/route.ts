import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const BASE_URL = "http://188.121.104.25:3003/api";

interface TokenPayload {
  id?: number;
  seller_id?: number;
  userId?: number;
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value ||
      cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    // 🔥 decode JWT
    const decoded = jwt.decode(token) as TokenPayload | null;

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const sellerId = decoded.seller_id || decoded.id || decoded.userId;

    if (!sellerId) {
      return NextResponse.json(
        { message: "Seller ID not found in token" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "4";

    const response = await fetch(
      `${BASE_URL}/api/comments/seller/${sellerId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });

  } catch (error) {
    console.error("SELLER COMMENTS ERROR:", error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}