import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export interface ApiClassroom {
  id: string;
  name: string;
  capacity: number;
  teacherIds?: string[]; // Many-to-many: classroom can have multiple teachers
  teacherNames?: string[]; // Optional: names of teachers
}

export interface ClassroomCreateDto {
  name: string;
  capacity: number;
  teacherIds?: string[]; // Assign multiple teachers on creation
}

export interface ClassroomUpdateDto extends ClassroomCreateDto {
  id: string;
  teacherIds?: string[]; // Update teacher assignments
}

// API functions
async function fetchClassrooms(): Promise<ApiClassroom[]> {
  const { data } = await api.get<ApiClassroom[]>("/classrooms");
  return data;
}

async function createClassroom(dto: ClassroomCreateDto): Promise<ApiClassroom> {
  const { data } = await api.post<ApiClassroom>("/classrooms", dto);
  return data;
}

async function updateClassroom(dto: ClassroomUpdateDto): Promise<void> {
  await api.put(`/classrooms/${dto.id}`, dto);
}

async function deleteClassroom(id: string): Promise<void> {
  await api.delete(`/classrooms/${id}/hard`);
}

// Hooks
export function useClassrooms() {
  return useQuery({ queryKey: ["classrooms"], queryFn: fetchClassrooms });
}

export function useCreateClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClassroom,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["classrooms"] }),
  });
}

export function useUpdateClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClassroom,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["classrooms"] }),
  });
}

export function useDeleteClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClassroom,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["classrooms"] }),
  });
}
