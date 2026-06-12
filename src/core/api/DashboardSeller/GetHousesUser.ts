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

    location: {
        lat: number;
        lng: number;
    };

    categories: {
        id: number;
        name: string;
    };

    bathrooms: number;
    parking: number;
    rooms: number;
    yard_type: string;

    num_comments: number;

    transaction_type: string;

    sellerId: string;
}

export interface IGetHosuesRes {
    houses: IHouse[];
    totalCount: number;
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