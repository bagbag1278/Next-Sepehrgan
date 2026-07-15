import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        //  query params
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") ?? "1";
        const limit = searchParams.get("limit") ?? "4";
        const search = searchParams.get("search") ?? "";

        const res = await axios.get(
            "http://188.121.104.25:3003/api/houses/seller/user",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { page, limit, search },
            }
        );

        return NextResponse.json(res.data);

    } catch (err) {
        console.log("API ROUTE ERROR:", err);
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
}