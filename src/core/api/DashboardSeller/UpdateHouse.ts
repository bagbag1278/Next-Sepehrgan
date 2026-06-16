import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.104.25:3003/api";

const UpdateHouse = async (id: number, data: any) => {
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    throw new Error("لطفاً دوباره وارد شوید");
  }

  const response = await axios.put(
    `${API_BASE_URL}/houses/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export default UpdateHouse;