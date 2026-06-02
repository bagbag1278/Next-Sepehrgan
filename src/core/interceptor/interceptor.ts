import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const getItem = (key: string) => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
};

const removeItem = (key: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
};

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const http = axios.create({
  baseURL,
});

type ApiSuccessResponse = {
  success?: boolean;
  message?: string;
};

// response interceptor
const onSuccess = (response: { data: ApiSuccessResponse }) => {
  const data = response?.data;

  if (data?.success === false && data?.message) {
    toast.error(data.message);
  } else if (data?.success === true && data?.message) {
    toast.success(data.message);
  }

  return response.data;
};

const onError = (err: AxiosError<{ message?: string }>) => {
  const status = err.response?.status;

  if (status === 401) {
    removeItem("accessToken");
    removeItem("refreshToken");
    toast.error("لطفا دوباره وارد شوید");
  }

  const message =
    err.response?.data?.message || err.message || "خطایی رخ داده است";

  toast.error(message);

  return Promise.reject(err);
};

http.interceptors.response.use(onSuccess, onError);

http.interceptors.request.use((opt: InternalAxiosRequestConfig) => {
  const token = getItem("accessToken");

  if (token) {
    opt.headers.Authorization = `Bearer ${token}`;
  }

  return opt;
});

export default http;
