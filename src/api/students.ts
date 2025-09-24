// src/api/students.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

// API model (اللي راجع من الـ API)
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

// DTOs (اللي محتاجها الـ API عند الإنشاء أو التعديل)
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

// ==================
// Mapping functions
// ==================
export function mapToCreateDto(student: ApiStudent): StudentCreateDto {
  const [firstName, fatherName, grandpaName] = student.fullName.split(" ");
  return {
    FirstName: firstName ?? "",
    FatherName: fatherName ?? "",
    GrandpaName: grandpaName ?? "",
    DateOfBirth: student.dateOfBirth,
    ParentPhone: student.parentPhone,
    Address: student.address,
    ClassroomId: student.classroomId,
  };
}

export function mapToUpdateDto(student: ApiStudent): StudentUpdateDto {
  const [firstName, fatherName, grandpaName] = student.fullName.split(" ");
  return {
    id: student.id,
    FirstName: firstName ?? "",
    FatherName: fatherName ?? "",
    GrandpaName: grandpaName ?? "",
    DateOfBirth: student.dateOfBirth,
    ParentPhone: student.parentPhone,
    Address: student.address,
    ClassroomId: student.classroomId,
  };
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
