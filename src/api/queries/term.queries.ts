import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../axios-client";
import { useQueryClient } from "@tanstack/react-query";

export function useGetTerms(requestBody: { moduleId: string }) {
  return useQuery({
    queryKey: ["terms"],
    queryFn: async () => {
      try {
        const res = await client.get(`/modules/${requestBody.moduleId}/terms`);
        return { ok: true, data: res.data };
      } catch (error) {
        return { ok: false, error: error || "Failed to fetch terms" };
      }
    },
  });
}

export function useGetTermById(requestBody: {
  moduleId: string;
  termId: string;
}) {
  return useQuery({
    queryKey: ["term"],
    queryFn: async () => {
      try {
        const res = await client.get(
          `/modules/${requestBody.moduleId}/terms/${requestBody.termId}`
        );
        return { ok: true, data: res.data };
      } catch (error) {
        return { ok: false, error: error || "Failed to fetch term" };
      }
    },
  });
}

export function useCreateTerm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestBody: {
      moduleId: string;
      term: string;
      definition: string;
      isStarred?: boolean;
      status?: string;
    }) => {
      try {
        const { data } = await client.post(
          `/modules/${requestBody.moduleId}/terms`,
          requestBody
        );
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error || "Failed to create term" };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useUpdateTerm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestBody: {
      moduleId: string;
      termId: string;
      term: string;
      definition: string;
      isStarred?: boolean;
      status?: string;
    }) => {
      try {
        const { data } = await client.put(
          `/modules/${requestBody.moduleId}/terms/${requestBody.termId}`,
          requestBody
        );
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error || "Failed to update term" };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useDeleteTerm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestBody: { moduleId: string; termId: string }) => {
      try {
        const { data } = await client.delete(
          `/modules/${requestBody.moduleId}/terms/${requestBody.termId}`
        );
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error || "Failed to delete term" };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
