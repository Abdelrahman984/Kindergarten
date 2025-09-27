// src/api/classrooms.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";
import { ApiStudent } from "./teachers";

// =============================
// Interfaces
// =============================
export interface ApiClassroom {
  id: string;
  name: string;
  capacity: number;
}

export interface ClassroomDetails extends ApiClassroom {
  studentsCount: number;
  teacherIds?: string[]; // Many-to-many: classroom can have multiple teachers
  teacherNames?: string[]; // Optional: names of teachers
}

export interface TeacherClassroom extends ApiClassroom {
  students: ApiStudent[];
}

export interface ClassroomCreateDto {
  name: string;
  capacity: number;
  teacherIds?: string[];
  schedule?: string;
  activities?: string[];
}

export interface ClassroomUpdateDto extends ClassroomCreateDto {
  id: string;
  currentActivity?: string;
}

export interface ClassroomReport {
  total: number;
  averageCapacity: number;
  withStudents: number;
  withoutStudents: number;
  studentsCount: ClassroomStudentCount[];
}

export interface ClassroomStudentCount {
  classroomId: string;
  classroomName: string;
  classroomCapacity: number;
  studentCount: number;
}

// =============================
// API functions
// =============================
async function fetchClassrooms(): Promise<ApiClassroom[]> {
  const { data } = await api.get<ApiClassroom[]>("/classrooms");
  return data;
}

async function fetchClassroomsWithDetails(): Promise<ClassroomDetails[]> {
  const { data } = await api.get<ClassroomDetails[]>("/classrooms/details");
  return data;
}

async function fetchClassroomById(id: string): Promise<ApiClassroom> {
  const { data } = await api.get<ApiClassroom>(`/classrooms/${id}`);
  return data;
}

async function createClassroom(dto: ClassroomCreateDto): Promise<ApiClassroom> {
  const { data } = await api.post<ApiClassroom>("/classrooms", dto);
  return data;
}

async function updateClassroom(dto: ClassroomUpdateDto): Promise<ApiClassroom> {
  const { data } = await api.put<ApiClassroom>(`/classrooms/${dto.id}`, dto);
  return data;
}

async function deleteClassroom(id: string): Promise<void> {
  await api.delete(`/classrooms/${id}`);
}

async function fetchClassroomStats(): Promise<ClassroomReport> {
  const { data } = await api.get<ClassroomReport>("/classrooms/stats");
  return data;
}

async function fetchStudentCounts(): Promise<ClassroomStudentCount[]> {
  const { data } = await api.get<ClassroomStudentCount[]>(
    "/classrooms/student-counts"
  );
  return data;
}

// =============================
// React Query Hooks
// =============================
export function useClassrooms() {
  return useQuery({
    queryKey: ["classrooms"],
    queryFn: fetchClassrooms,
  });
}

export function useClassroomsWithDetails() {
  return useQuery({
    queryKey: ["classrooms", "details"],
    queryFn: fetchClassroomsWithDetails,
  });
}

export function useClassroom(id: string) {
  return useQuery({
    queryKey: ["classrooms", id],
    queryFn: () => fetchClassroomById(id),
    enabled: !!id, // only fetch if id is provided
  });
}

export function useCreateClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
    },
  });
}

export function useUpdateClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClassroom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
      queryClient.invalidateQueries({ queryKey: ["classrooms", data.id] });
    },
  });
}

export function useDeleteClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
    },
  });
}

export function useClassroomStats() {
  return useQuery({
    queryKey: ["classrooms", "stats"],
    queryFn: fetchClassroomStats,
  });
}

export function useClassroomStudentCount() {
  return useQuery({
    queryKey: ["classrooms", "student-count"],
    queryFn: fetchStudentCounts,
  });
}
