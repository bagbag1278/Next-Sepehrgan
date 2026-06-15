import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

const DeleteHouse = async (id: number) => {
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    throw new Error("لطفاً دوباره وارد شوید");
  }

  const response = await axios.delete(
    `${API_BASE_URL}/houses/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export default DeleteHouse;