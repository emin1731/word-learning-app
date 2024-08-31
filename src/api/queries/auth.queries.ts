import { useMutation } from "@tanstack/react-query";
import { client } from "../axios-client";
import { setTokensInCookies } from "@/lib/cookie-handler";

export function useLogin() {
  return useMutation({
    mutationFn: async (requestBody: { email: string; password: string }) => {
      try {
        const { data } = await client.post("/auth/login", requestBody);
        const { accessToken, refreshToken } = data;

        setTokensInCookies(accessToken, refreshToken);

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

export function useRegister() {
  return useMutation({
    mutationFn: async (requestBody: { email: string; password: string }) => {
      try {
        const { data } = await client.post("/auth/register", requestBody);
        const { accessToken, refreshToken } = data;

        setTokensInCookies(accessToken, refreshToken);

        return { ok: true, data };
      } catch (error) {
        console.error("Register error:", error);
        return { ok: false, error: error || "Register failed" };
      }
    },
    onSuccess: () => {
      console.log("Token set, ready for authenticated requests");
    },
  });
}
