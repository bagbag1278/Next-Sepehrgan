import {
    NextRequest,
    NextResponse,
} from "next/server";

import {
    cookies,
} from "next/headers";

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

        const response =
            await fetch(
                "http://188.121.111.8:3003/api/seller/finance/dashboard",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        const data =
            await response.json();

        return NextResponse.json(
            data,
            {
                status:
                    response.status,
            }
        );

    } catch (error) {

        console.log(
            "FINANCE DASHBOARD ERROR =>",
            error
        );

        return NextResponse.json(
            {
                message:
                    "server error",
            },
            {
                status: 500,
            }
        );

    }

}