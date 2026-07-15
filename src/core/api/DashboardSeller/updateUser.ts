import { cookies } from "next/headers";

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
        `http://188.121.104.25:3003/api/proxy/users/${userId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
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