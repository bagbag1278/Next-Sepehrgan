import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function parseJwt(token: string) {
    try {
        return JSON.parse(
            Buffer.from(
                token.split(".")[1],
                "base64"
            ).toString()
        );
    } catch {
        return null;
    }
}

export async function GET(
    request: NextRequest
) {

    try {

        const cookieStore =
            await cookies();

        const token =
            cookieStore.get(
                "accessToken"
            )?.value;

        if (!token) {

            return NextResponse.json(
                {
                    message:
                        "Token not found"
                },
                {
                    status: 401
                }
            );

        }

        const decoded =
            parseJwt(token);

        const userId =
            decoded?.id;

        const searchParams =
            request.nextUrl.searchParams;

        const page =
            searchParams.get("page") || "1";

        const limit =
            searchParams.get("limit") || "4";

        const status = searchParams.get("status");

        let url = `http://188.121.104.25:3003/api/bookings/${userId}/customers?page=${page}&limit=${limit}`;

        if (status) {
            url += `&status=${status}`;  
        }

        console.log("BOOKING URL:", url);

        const response =
            await axios.get(
                url,
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
            "BOOKING ERROR",
            error?.response?.data ||
            error
        );

        return NextResponse.json(
            {
                message:
                    "Server Error"
            },
            {
                status: 500
            }
        );

    }

}