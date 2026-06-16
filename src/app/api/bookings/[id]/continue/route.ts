import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const response = await axios.post(
            `http://188.121.104.25:3003/api/bookings/${id}/continue`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.log(
            "CONTINUE BOOKING ERROR",
            error?.response?.data || error
        );

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}