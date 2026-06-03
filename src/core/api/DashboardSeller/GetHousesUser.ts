import axios from "axios";

export interface IHouse {
    id: number;
    title: string;
    price: string;
}

export interface IGetHosuesRes {
    housesProps: IHouse[];
    totalCount: number;
}

export default async function GetHousesUser(): Promise<IGetHosuesRes> {
    try {
        const res = await axios.get('http://188.121.111.8:3003/api/houses/seller/user', {withCredentials:true })
        const data = await res.data
        return data
    } catch (err) {
        console.log("dataFetching Error", err)
        throw err
    };
}