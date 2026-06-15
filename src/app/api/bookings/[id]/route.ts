import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get("accessToken")?.value;

        console.log("TOKEN =>", token);

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const res = await fetch(
            `http://188.121.111.8:3003/api/bookings/${params.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        const data = await res.json();

        return NextResponse.json(data, {
            status: res.status,
        });

    } catch (error) {
        console.log("DELETE BOOKING ERROR:", error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}