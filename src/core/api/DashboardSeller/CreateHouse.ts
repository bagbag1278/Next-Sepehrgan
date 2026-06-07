import axios from "axios";

export interface CreateHouseBody {
  title: string;
  capacity: number;
  price: number;
  transaction_type: string;
  propertyType: string;
  region: string;
  caption: string;

  location: {
    lat: number;
    lng: number;
    address: string;
  };

  rooms: number;
  bathrooms: number;
  parking: number;
  yard_type: string;
  tags: string[];

  image: string | null;
}

export default async function CreateHouse(body: any) {

  try {
    const res = await axios.post("/api/houses/create", body);
    return res.data;

  } catch (err) {
    console.log(err);
    throw err;
  };

}