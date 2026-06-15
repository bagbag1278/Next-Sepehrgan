import axios from "axios";

export interface IHouse {
    id: number;
    title: string;
    address: string;
    photos: string[] | null;
    rate: string | null;
    price: string;
    tags: string[];
    last_updated?: string;
    capacity: number;
    location: { lat: number; lng: number };
    categories: { id: number; name: string };
    bathrooms: number;
    parking: number;
    rooms: number;
    yard_type: string;
    num_comments: number;
    transaction_type: string;
    sellerId: string;
}

export interface IGetHousesRes {
    houses: IHouse[];
    totalCount: number;
    page: number;
    limit: number;
}

export interface IGetHousesParams {
    page?: number;
    limit?: number;
    search?: string;
}

export default async function GetHousesUser(
    { page = 1, limit = 4, search = "" }: IGetHousesParams = {}
): Promise<IGetHousesRes> {
    const res = await axios.get("/api/houses", {
        params: { page, limit, search },
    });
    return res.data;
}