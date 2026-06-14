import axios from "axios";

const api = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: () => void;
  reject: (error: Error) => void;
}[] = [];

const processQueue = (error?: Error) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

// توکن رو از کوکی بخون و چک کن چقدر مونده
function getTokenTimeLeft(): number | null {
  const cookies = document.cookie.split(";");
  
  // accessToken روی httpOnly هست، پس نمیتونیم مستقیم بخونیمش
  // به جاش از یه کوکی کمکی استفاده میکنیم
  const expiryCookie = cookies
    .find((c) => c.trim().startsWith("accessTokenExpiry="))
    ?.split("=")[1];

  if (!expiryCookie) return null;

  const expiry = parseInt(expiryCookie);
  return expiry - Math.floor(Date.now() / 1000);
}

async function refreshToken(): Promise<void> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }
}

// request interceptor — قبل از هر request چک کن
api.interceptors.request.use(async (config) => {
  const timeLeft = getTokenTimeLeft();

  // اگه کمتر از 2 دقیقه مونده، refresh کن
  if (timeLeft !== null && timeLeft < 120) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await refreshToken();
        processQueue();
      } catch (err) {
        processQueue(err as Error);
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }
  }

  return config;
});

// response interceptor — اگه 401 گرفتیم به عنوان fallback
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      await refreshToken();
      processQueue();
      return api(originalRequest);
    } catch (err) {
      processQueue(err as Error);
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;