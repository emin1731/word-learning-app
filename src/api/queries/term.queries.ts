import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../axios-client";
import { useQueryClient } from "@tanstack/react-query";
import { LearningStatus } from "@/lib/dto/term.dto";
import { SortOptions } from "./module.queries";

export function useGetTerms(requestBody: {
  moduleId: string;
  sortBy: SortOptions;
  searchQuery: string;
}) {
  return useQuery({
    queryKey: ["terms", requestBody.sortBy, requestBody.searchQuery],
    queryFn: async () => {
      try {
        const res = await client.get(
          `/modules/${requestBody.moduleId}/terms?sortBy=${requestBody.sortBy}&searchQuery=${requestBody.searchQuery}`
        );
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
    mutationFn: async ({
      moduleId,
      term,
      definition,
      isStarred = false, // default value for isStarred
      status = "NOT_STARTED", // default value for status
    }: {
      moduleId: string;
      term: string;
      definition: string;
      isStarred?: boolean;
      status?: LearningStatus;
    }) => {
      try {
        const { data } = await client.post(`/modules/${moduleId}/terms`, {
          moduleId,
          term,
          definition,
          isStarred,
          status,
        });
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
    mutationFn: async ({
      moduleId,
      termId,
      term,
      definition,
      isStarred = false, // default value for isStarred
      status = "NOT_STARTED", // default value for status
    }: {
      moduleId: string;
      termId: string;
      term: string;
      definition: string;
      isStarred?: boolean;
      status?: LearningStatus;
    }) => {
      try {
        const { data } = await client.put(
          `/modules/${moduleId}/terms/${termId}`,
          { moduleId, term, definition, isStarred, status }
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
