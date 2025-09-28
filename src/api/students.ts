// src/api/students.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";
import { s } from "node_modules/@fullcalendar/core/internal-common";

// API model (اللي راجع من الـ API)
export interface ApiStudent {
  id: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  isActive: boolean;
  classroomId: string;
  classroomName: string;
  attendanceRate: number;
  parentName: string;
  parentPhone: string;
  parentAddress: string;
}

// DTOs (اللي محتاجها الـ API عند الإنشاء أو التعديل)
export interface StudentCreateDto {
  FullName: string;
  DateOfBirth: string;
  Address: string;
  ClassroomId: string;
  ParentName: string;
  ParentPhone: string;
  ParentAddress: string;
}

export interface StudentUpdateDto extends StudentCreateDto {
  id: string;
}

export interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  averageAge: number;
}

// ==================
// API functions
// ==================
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

// Fetch students by classroomId
async function fetchStudentsByClassroom(
  classroomId: string
): Promise<ApiStudent[]> {
  const { data } = await api.get<ApiStudent[]>(
    `/students/by-classroom/${classroomId}`
  );
  return data;
}
// Fetch student statistics
async function fetchStudentStats(): Promise<StudentStats> {
  const { data } = await api.get<StudentStats>("/students/stats");
  return data;
}

// ==================
// React Query hooks
// ==================
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

// React Query hook for students by classroom
export function useStudentsByClassroom(classroomId: string) {
  return useQuery({
    queryKey: ["students", "classroom", classroomId],
    queryFn: () => fetchStudentsByClassroom(classroomId),
    enabled: !!classroomId,
  });
}

// React Query hook for student statistics
export function useStudentStats() {
  return useQuery({
    queryKey: ["students", "stats"],
    queryFn: fetchStudentStats,
  });
}
