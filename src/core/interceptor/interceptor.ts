import axios from "axios";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSuccess = (response: any) => {
  console.log("interceptor response:", response);

  if (response?.data?.success !== undefined && !response.data.success) {
    toast.error(response.data.message);
  } else if (response?.data?.success !== undefined && response.data.success) {
    toast(response.data.message);
  }

  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onError = (err: any) => {
  console.log("interceptor error:", err);

  const status = err?.response?.status;

  if (status === 401) {
    removeItem("token");

    // window.location.pathname = "/";
    toast.error("لطفا دوباره وارد شوید");
  }

  if (status >= 400 && status < 500) {
    // alert("Client error: " + status);
  }

  return Promise.reject(err);
};

http.interceptors.response.use(onSuccess, onError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
http.interceptors.request.use((opt: any) => {
  const token = getItem("token");

  if (token) {
    opt.headers = opt.headers ?? {};
    opt.headers.Authorization = "Bearer " + token;
  }

  return opt;
});

export default http;
