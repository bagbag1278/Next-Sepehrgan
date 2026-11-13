import { cookies } from "next/headers";
import { apiUrl } from "@/core/api/baseUrl";

export async function updateUser(
    userId: number,
    data: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }
) {
    const cookieStore = await cookies();

    const response = await fetch(
        apiUrl(`users/${userId}`),
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookieStore.get("accessToken")?.value ?? ""}`,
            },
            body: JSON.stringify({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                fullName: `${data.firstName} ${data.lastName}`.trim(),
                phoneNumber: data.phoneNumber,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update user");
    }

    return response.json();
}
