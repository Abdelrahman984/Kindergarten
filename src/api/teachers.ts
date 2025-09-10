import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export interface ApiTeacher {
  id: string;
  fullName: string;
  subject: string;
  isActive: boolean;
}

export interface TeacherCreateDto {
  fullName: string;
  subject: string;
}

export interface TeacherUpdateDto extends TeacherCreateDto {
  id: string;
  isActive: boolean;
}

export interface ApiStudent {
  id: string;
  fullName: string;
  dateOfBirth?: string;
  parentPhone?: string;
  isActive?: boolean;
  classroomId?: string;
  classroomName?: string;
  attendanceRate?: number;
  address?: string;
}

// API functions
async function fetchTeachers(): Promise<ApiTeacher[]> {
  const { data } = await api.get<ApiTeacher[]>("/teachers");
  return data;
}

async function createTeacher(dto: TeacherCreateDto): Promise<ApiTeacher> {
  const { data } = await api.post<ApiTeacher>("/teachers", dto);
  return data;
}

async function updateTeacher(dto: TeacherUpdateDto): Promise<void> {
  await api.put(`/teachers/${dto.id}`, dto);
}

async function deleteTeacher(id: string): Promise<void> {
  await api.delete(`/teachers/${id}/hard`);
}

async function fetchMyClassStudents(teacherId: string): Promise<ApiStudent[]> {
  const { data } = await api.get<ApiStudent[]>(
    `/teachers/${teacherId}/students`
  );
  return data;
}

// Hooks
export function useTeachers() {
  return useQuery({ queryKey: ["teachers"], queryFn: fetchTeachers });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useMyClassStudents(teacherId: string) {
  return useQuery({
    queryKey: ["myClassStudents", teacherId],
    queryFn: () => fetchMyClassStudents(teacherId),
  });
}
