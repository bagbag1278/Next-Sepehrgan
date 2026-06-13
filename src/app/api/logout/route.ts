import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get("accessToken")?.value;

        // Logout Backend
        try {
            await fetch("http://188.121.111.8:3003/api/auth/logout", {
                method: "POST",
                headers: {
                    ...(token
                        ? {
                            Cookie: `accessToken=${token}`,
                        }
                        : {}),
                },
            });
        } catch (error) {
            console.log("Backend logout failed");
        }

        // حذف کوکی
        cookieStore.delete("accessToken");

        return Response.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}