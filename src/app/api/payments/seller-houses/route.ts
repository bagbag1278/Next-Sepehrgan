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

        const searchParams =
            request.nextUrl.searchParams;

        const page =
            searchParams.get(
                "page"
            ) || "1";

        const limit =
            searchParams.get(
                "limit"
            ) || "10";

        const sort =
            searchParams.get(
                "sort"
            ) || "createdAt";

        const order =
            searchParams.get(
                "order"
            ) || "DESC";

        const status =
            searchParams.get(
                "status"
            );

        const params =
            new URLSearchParams();

        params.set(
            "page",
            page
        );

        params.set(
            "limit",
            limit
        );

        params.set(
            "sort",
            sort
        );

        params.set(
            "order",
            order
        );

        if (status) {

            params.set(
                "status",
                status
            );

        }

        console.log(
            "PAYMENTS QUERY =>",
            params.toString()
        );

        const response =
            await fetch(
                `http://188.121.111.8:3003/api/payments/seller-houses?${params.toString()}`,
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
            "PAYMENTS ERROR =>",
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