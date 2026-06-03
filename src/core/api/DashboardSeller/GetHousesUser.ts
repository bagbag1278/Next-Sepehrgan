import axios from "axios";

export interface IHouse {
    id: number;
    title: string;
    price: string;
}

export default async function GetHousesUser(): Promise<IHouse[]> {
    try {
        const res = await axios.get('http://188.121.111.8:3003/api/houses/seller/user')
        const data = res.data
        return data
    } catch (err) {
        throw new Error("Error in DataFetching")
    }
}