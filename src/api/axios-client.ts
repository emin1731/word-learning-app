import {
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
  removeTokensFromCookies,
  setTokensInCookies,
} from "@/lib/cookie-handler";
import axios from "axios";
import Cookies from "js-cookie";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001/",
  headers: {
    "Content-Type": "application/json", // Change according to header type
  },
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromCookies(); // Get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Set in header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = getRefreshTokenFromCookies(); // Retrieve the stored refresh token.

        // Make a request to your auth server to refresh the token.
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/refreshToken`,
          {
            refreshToken,
          }
        );
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        // Store the new access and refresh tokens.
        setTokensInCookies(accessToken, newRefreshToken);
        Cookies.set("isLoggedIn", "true", {
          secure: true,
          sameSite: "Strict",
        });

        // Update the authorization header with the new access token.
        client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return client(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        removeTokensFromCookies();
        Cookies.set("isLoggedIn", "false", {
          secure: true,
          sameSite: "Strict",
        });
        return Promise.reject(refreshError);
      }
    }
  }
);

export default client;
