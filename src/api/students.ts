import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export interface ApiStudent {
  id: string;
  fullName: string;
  dateOfBirth: string;
  parentFullName: string;
  parentPhone: string;
  address: string;
  parentAddress: string;
  isActive: boolean;
  classroomId: string;
  classroomName: string;
  attendanceRate: number;
}

export interface StudentCreateDto {
  FirstName: string;
  FatherName: string;
  GrandpaName: string;
  DateOfBirth: string;
  ParentPhone: string;
  Address: string;
  ClassroomId: string;
}

export interface StudentUpdateDto {
  id: string;
  FirstName: string;
  FatherName: string;
  GrandpaName: string;
  DateOfBirth: string;
  ParentPhone: string;
  Address: string;
  ClassroomId: string;
}

// API functions
async function fetchStudents(): Promise<ApiStudent[]> {
  const { data } = await api.get<ApiStudent[]>("/students");
  return data;
}

async function createStudent(dto: StudentCreateDto): Promise<ApiStudent> {
  const { data } = await api.post<ApiStudent>("/students", dto);
  return data;
}

async function updateStudent(dto: StudentUpdateDto): Promise<void> {
  await api.put(`/students/${dto.id}`, dto);
}

async function deleteStudent(id: string): Promise<void> {
  await api.delete(`/students/${id}/hard`);
}

// Hooks
export function useStudents() {
  return useQuery({ queryKey: ["students"], queryFn: fetchStudents });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
}
