import api from "@/core/interceptor/axiosInstance";
import axios from "axios";

export async function deleteFavorite(favoriteId: number) {
  try {
    const { data } = await api.delete(
      `/favorites/${favoriteId}`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("MESSAGE:", error.message);
      console.log("CODE:", error.code);
      console.log("RESPONSE:", error.response?.data);
      console.log("STATUS:", error.response?.status);
      console.log("CONFIG:", error.config?.url);
    }

    throw error;
  }
}