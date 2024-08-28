import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuth } from "./refresh-auth";
import { getAccessTokenFromCookies } from "./cookie-handler";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001/",
  withCredentials: true,
});

client.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessTokenFromCookies();
    console.log("ACCESS TOKEN in interceptor: " + accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setHeaderToken = (token: string) => {
  if (
    token &&
    client.defaults.headers.common.Authorization !== `Bearer ${token}`
  ) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log(
      "Authorization header set:",
      client.defaults.headers.common.Authorization
    );
  }
};

export const removeHeaderToken = () => {
  delete client.defaults.headers.common.Authorization;
};

createAuthRefreshInterceptor(client, refreshAuth, {
  statusCodes: [401], // Intercept 401 Unauthorized errors
  pauseInstanceWhileRefreshing: true,
});
