import { useMutation } from "@tanstack/react-query";
import { client } from "../axios-client";

export function useGetTerms() {
  return useMutation({
    mutationKey: ["terms"],
    mutationFn: async (moduleId: string) => {
      try {
        const res = await client.get(`/modules/${moduleId}/terms`);
        return { ok: true, data: res.data };
      } catch (error) {
        return { ok: false, error: error || "Failed to fetch terms" };
      }
    },
  });
}

export function useCreateTerm() {
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
  });
}

export function useGetTermById() {
  return useMutation({
    mutationKey: ["term"],
    mutationFn: async (requestBody: { moduleId: string; termId: string }) => {
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

export function useUpdateTerm() {
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
  });
}

export function useDeleteTerm() {
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
  });
}
