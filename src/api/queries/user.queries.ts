import { useQuery } from "@tanstack/react-query";
import { client } from "../client";

export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log(
        "[useGetProfile] Request Headers:",
        client.defaults.headers.common.Authorization
      );
      const res = await client.get(`/users/profile`);
      return res.data;
    },
  });
}
