import { useMutation } from "@tanstack/react-query";
import { client, setHeaderToken } from "../client";
import { setTokensInCookies } from "../cookie-handler";
// import { useAuthStore } from "@/store/index";

export function useLogin() {
  return useMutation({
    mutationFn: async (requestBody: { email: string; password: string }) => {
      try {
        const { data } = await client.post("/auth/login", requestBody);
        const { accessToken, refreshToken } = data;

        setTokensInCookies(accessToken, refreshToken);
        setHeaderToken(accessToken);

        return { ok: true, data };
      } catch (error) {
        console.error("Login error:", error);
        return { ok: false, error: error || "Login failed" };
      }
    },
    onSuccess: () => {
      console.log("Token set, ready for authenticated requests");
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async (oldRefreshToken: string) => {
      try {
        const { data } = await client.post("/auth/refreshToken", {
          oldRefreshToken,
        });
        const { accessToken, refreshToken } = data;
        return { ok: true, data: { accessToken, refreshToken } };
      } catch (error) {
        console.error("Refresh token error:", error);
        return { ok: false, error: error || "Refresh token failed" };
      }
    },
  });
}
