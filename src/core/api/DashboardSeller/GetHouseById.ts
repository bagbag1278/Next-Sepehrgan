import axios from "axios";

export interface IHouseDetails {
    id: number;
    title: string;
    address: string;
    description: string;
    photos: string[];
    price: string;
    rooms: number;
    bathrooms: number;
    parking: number;
    yard_type: string;
    tags: string[];
}

export default async function GetHouseById(
    houseId: number
) {
    const res = await axios.get(
        `http://188.121.111.8:3003/api/houses/${houseId}`
    );

    return res.data;
}