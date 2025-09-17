import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export interface ApiTeacher {
  id: string;
  fullName: string;
  phoneNumber?: string;
  subjectId: string;
  subjectName: string;
  isActive: boolean;
  classroomIds?: string[];
}

export interface TeacherCreateDto {
  fullName: string;
  subjectId: string;
  phoneNumber?: string;
  isActive: boolean;
  classroomIds?: string[]; // Assign multiple classrooms on creation
}

export interface TeacherUpdateDto extends TeacherCreateDto {
  id: string;
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
  await api.delete(`/teachers/${id}`);
}

async function fetchMyClassStudents(teacherId: string): Promise<ApiStudent[]> {
  const { data } = await api.get<ApiStudent[]>(
    `/teachers/${teacherId}/students`
  );
  return data;
}

async function fetchTeacherClassrooms(teacherId: string) {
  const { data } = await api.get(`/teachers/${teacherId}/classrooms`);
  // Expecting array of classrooms for many-to-many
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

export function useTeacherClassrooms(teacherId: string) {
  return useQuery({
    queryKey: ["teacherClassrooms", teacherId],
    queryFn: () => fetchTeacherClassrooms(teacherId),
    enabled: !!teacherId,
  });
}
