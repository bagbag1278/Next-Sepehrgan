import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: {
        params: Promise<{
            id: string
        }>
    }
) {

    try {

        const { id } =
            await params;

        const cookieStore =
            await cookies();

        const token =
            cookieStore.get(
                "accessToken"
            )?.value;

        const searchParams = request.nextUrl.searchParams;

        const query = searchParams.toString();

        const response =
            await axios.get(
                `http://188.121.111.8:3003/api/bookings/${id}/customers?${query}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return NextResponse.json(
            response.data
        );

    } catch (error: any) {

        console.log(
            "Booking Customers Error:",
            error.response?.data ||
            error.message
        );

        return NextResponse.json(
            {
                message:
                    error.response?.data ||
                    "server error",
            },
            {
                status:
                    error.response?.status ||
                    500,
            }
        );

    }

}