import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://188.121.104.25:3003/api";

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

export default async function CreateHouse(body: CreateHouseBody) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("لطفاً دوباره وارد شوید");
  }

  try {
    const res = await axios.post(
      `${API_BASE_URL}/houses`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}