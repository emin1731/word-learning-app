import { useQuery } from "@tanstack/react-query";
import { client } from "../axios-client";

export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        console.log(
          "[useGetProfile] Request Headers:",
          client.defaults.headers.common.Authorization
        );
        const res = await client.get(`/users/profile`);
        return { ok: true, data: res.data };
      } catch (error) {
        return { ok: false, error: error || "Failed to fetch profile" };
      }
    },
  });
}
