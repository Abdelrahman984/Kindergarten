import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client"; // axios instance

export interface Subject {
  id: string;
  name: string;
}

export const useSubjects = () => {
  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } = await api.get<Subject[]>("/subjects");
      return data;
    },
  });
};

export const useAddSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subject: { name: string }) => {
      const { data } = await api.post("/subjects", subject);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subject: Subject) => {
      const { data } = await api.put(`/subjects/${subject.id}`, subject);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/subjects/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};
