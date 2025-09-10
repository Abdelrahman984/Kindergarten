import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export interface Student {
  id: string;
  fullName: string;
  dateOfBirth: string;
  parentPhone: string;
  isActive: boolean;
}

export const useMyChildren = (parentId: string) =>
  useQuery<Student[]>({
    queryKey: ["myChildren", parentId],
    queryFn: async () => {
      const res = await api.get(`/parents/${parentId}/children`);
      return res.data as Student[];
    },
  });
