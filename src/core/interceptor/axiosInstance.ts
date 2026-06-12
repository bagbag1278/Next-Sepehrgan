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
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

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
      console.log("401 DETECTED");

      const refreshResponse = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      console.log("REFRESH STATUS:", refreshResponse.status);

      if (!refreshResponse.ok) {
        throw new Error("Refresh failed");
      }

      processQueue();

      return api(originalRequest);
    } catch (err) {
      console.log("REFRESH FAILED");

      processQueue(err as Error);

      window.location.href = "/login";

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
