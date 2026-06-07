import axios from "axios";

export interface IHouse {
    id: string;
    title: string;
    address?: string;
    photos?: string[];
    price?: string;
}

export interface IGetHosuesRes {
    houses: IHouse[];
}

export default async function GetHousesUser():
    Promise<IGetHosuesRes> {

    try {

        const res = await axios.get("/api/houses");

        return res.data;

    } catch (err) {

        console.log(
            "dataFetching Error",
            err
        );

        throw err;

    }

}