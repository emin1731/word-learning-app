import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../axios-client";

export function useGetModules() {
  return useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      try {
        const res = await client.get(`/modules`);
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
  return useMutation({
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
  });
}

export function useUpdateModule() {
  return useMutation({
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
  });
}

export function useDeleteModule() {
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const { data } = await client.delete(`/modules/${id}`);
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error || "Failed to delete module" };
      }
    },
  });
}
