import Cookies from "js-cookie";

export const setTokensInCookies = (
  accessToken: string,
  refreshToken: string
) => {
  return new Promise<void>((resolve) => {
    try {
      Cookies.set("accessToken", accessToken, {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", refreshToken, {
        secure: true,
        sameSite: "Strict",
      });
      resolve();
    } catch (error) {
      console.error("Failed to set cookies:", error);
    }
  });
};

// Get the tokens
export const getAccessTokenFromCookies = () => {
  return Cookies.get("accessToken");
};

export const getRefreshTokenFromCookies = () => {
  return Cookies.get("refreshToken");
};

// Remove the tokens
export const removeTokensFromCookies = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
