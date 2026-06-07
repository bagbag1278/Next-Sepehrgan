import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        const cookieStore = await cookies();

        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.get(
            "http://188.121.111.8:3003/api/houses/seller/user",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json(res.data);

    } catch (err) {

        console.log("API ROUTE ERROR:", err);

        return NextResponse.json(
            {
                message: "error",
            },
            {
                status: 500,
            }
        );

    }

}