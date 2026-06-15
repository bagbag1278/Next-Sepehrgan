import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://188.121.111.8:3003";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;

        console.log("TOKEN FROM COOKIE:", token); 

        if (!token) {
            return NextResponse.json(
                { message: "No token found" },
                { status: 401 }
            );
        }

        const res = await fetch(
            `${BASE_URL}/api/comments/${params.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        const data = await res.json();

        console.log("BACKEND RESPONSE:", data, res.status); // 👈 مهم

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.log("DELETE ERROR:", err);

        return NextResponse.json(
            { message: "server error" },
            { status: 500 }
        );
    }
}