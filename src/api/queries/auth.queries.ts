import { useMutation } from "@tanstack/react-query";
import { client } from "../axios-client";
// import { useAuthStore } from "@/store/index";

export function useLogin() {
  return useMutation({
    mutationFn: async (requestBody: { email: string; password: string }) => {
      try {
        const { data } = await client.post("/auth/login", requestBody);
        const { accessToken, refreshToken } = data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

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
