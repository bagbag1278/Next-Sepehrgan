import api from "@/core/interceptor/axiosInstance";


export const createPayment = async (data: {
  amount: number;
  description: string;
  callbackUrl: string;
  bookingId: number;
}) => {
  const res = await api.post("/payments", data);
  return res.data;
};