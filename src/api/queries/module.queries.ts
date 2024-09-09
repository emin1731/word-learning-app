import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../axios-client";
import { useQueryClient } from "@tanstack/react-query";

export type SortOptions = "name_asc" | "name_desc" | "date_asc" | "date_desc";

export function useGetModules(sortBy: SortOptions) {
  return useQuery({
    queryKey: ["modules", sortBy],
    queryFn: async () => {
      try {
        const res = await client.get(`/modules?sortBy=${sortBy}`);
        return { ok: true, data: res.data };
      } catch (error) {
        return { ok: false, error: error || "Failed to fetch modules" };
      }
    },
  });
}

export function useGetModuleById(moduleId: string) {
  return useQuery({
    queryKey: ["module"],
    queryFn: async () => {
      try {
        const res = await client.get(`/modules/${moduleId}`);
        return { ok: true, data: res.data };
      } catch (error) {
        return { ok: false, error: error || "Failed to fetch module" };
      }
    },
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["modules"],
    mutationFn: async (requestBody: {
      name: string;
      description: string;
      isPrivate: boolean;
    }) => {
      try {
        const { data } = await client.post("/modules", requestBody);
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error || "Failed to create module" };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["modules"],
    mutationFn: async (requestBody: {
      id: string;
      name: string;
      description: string;
      isPrivate: boolean;
    }) => {
      try {
        const { data } = await client.put(
          `/modules/${requestBody.id}`,
          requestBody
        );
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error || "Failed to update module" };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["modules"],
    mutationFn: async (id: string) => {
      try {
        const { data } = await client.delete(`/modules/${id}`);
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error || "Failed to delete module" };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
