import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ seller_id: string }> }
) {
    try {
        const { seller_id } = await params;

        const cookieStore = await cookies();

        console.log("ALL COOKIES =>", cookieStore.getAll());

        const token =
            cookieStore.get("token")?.value ||
            cookieStore.get("accessToken")?.value ||
            cookieStore.get("access_token")?.value;

        console.log("TOKEN =>", token);

        if (!token) {
            return NextResponse.json(
                { message: "Token not found" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);

        const page = searchParams.get("page") || "1";
        const limit = searchParams.get("limit") || "10";

        const response = await fetch(
            `${BASE_URL}/api/comments/seller/${seller_id}?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.log("ROUTE ERROR =>", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}