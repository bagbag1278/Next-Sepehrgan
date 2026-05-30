import axios from "axios";

export interface IHouse {

    id: number;
    title: string;
    price: string;

}

export default async function GetHousesUser()  {

    try {

        const res = await axios.get("http://next.genzuni.website/api/houses");

        console.log("DATAFETCHIG : ", res.data) 
        return res.data.houses;

    } catch (err) {

        console.log(err);

        throw err;

    }

};
