import { client, setHeaderToken } from "./client";
import {
  getRefreshTokenFromCookies,
  setTokensInCookies,
} from "./cookie-handler";

export const fetchNewToken = async () => {
  const refreshToken = getRefreshTokenFromCookies();
  console.log("REFRESH TOKEN before fetching new: " + refreshToken);

  try {
    console.log("BEGINNING OF REFRESH TOKEN : " + refreshToken);
    const response = await client.post("/auth/refreshToken", { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    console.log(
      "NEW TOKENS after auth/refreshToken :",
      accessToken,
      newRefreshToken
    );

    await setTokensInCookies(accessToken, newRefreshToken);

    console.log("NEW ACCESS TOKEN set:", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refreshAuth = async (failedRequest: any) => {
  try {
    const newToken = await fetchNewToken();

    if (newToken) {
      failedRequest.response.config.headers.Authorization = `Bearer ${newToken}`;
      setHeaderToken(newToken); // Ensure this sets the header correctly

      return Promise.resolve(newToken);
    } else {
      console.error("Failed to refresh the token, redirecting to login.");
      return Promise.reject(new Error("Token refresh failed."));
    }
  } catch (error) {
    console.error("Error during token refresh process:", error);
    return Promise.reject(error);
  }
};
