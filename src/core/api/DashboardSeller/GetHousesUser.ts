import { cookies } from "next/headers";
import axios from "axios";
import toast from "react-hot-toast";

export interface IHouse {
    id: number;
    title: string;
    price: string;
}

export default async function GetHousesUser(): Promise<IHouse[] | undefined> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("accessToken")?.value;

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        const response = await axios.get<IHouse[]>(`${baseUrl}/api/houses`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("خطا در دریافت دیتا:", error);
        toast.error("خطا در دریافت دیتا");
    }
}