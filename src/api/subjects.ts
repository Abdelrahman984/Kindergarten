import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client"; // axios instance

export interface Subject {
  id: string;
  name: string;
}
export interface TeacherAssignment {
  assigned: boolean;
  subjectName?: string;
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
  return useMutation<Subject, unknown, { name: string }>({
    mutationFn: async (subject) => {
      const { data } = await api.post<Subject>("/subjects", subject);
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

export const useUpdateSubjectTeachers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      subjectId,
      teacherIds,
    }: {
      subjectId: string;
      teacherIds: string[];
    }) => {
      await api.post(`/subjects/${subjectId}/teachers`, teacherIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useTeacherAssignment = (teacherId: string | null) => {
  return useQuery<TeacherAssignment>({
    queryKey: ["teacher-assignment", teacherId],
    queryFn: async () => {
      if (!teacherId) throw new Error("TeacherId is required");
      const res = await api.get<TeacherAssignment>(
        `/teachers/${teacherId}/assigned-subject`
      );
      return res.data;
    },
    enabled: !!teacherId, // يشتغل بس لو فيه teacherId
  });
};
