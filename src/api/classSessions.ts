// src/api/classSessions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

// =============================
// Interfaces
// =============================
export interface ApiClassSession {
  id: string;
  startTime: string;
  endTime: string;
  classroomId?: string;
  teacherId?: string;
  subjectId?: string;
  classroomName?: string;
  teacherName?: string;
  subjectName?: string;
}

export interface ClassSessionCreateDto {
  startTime: string;
  endTime: string;
  classroomId: string;
  teacherId: string;
  subjectId: string;
}

export interface ClassSessionUpdateDto extends ClassSessionCreateDto {
  id: string;
}

// =============================
// API functions
// =============================
async function fetchClassSessions(): Promise<ApiClassSession[]> {
  const { data } = await api.get<ApiClassSession[]>("/ClassSession");
  return data;
}

async function fetchClassSessionById(id: string): Promise<ApiClassSession> {
  const { data } = await api.get<ApiClassSession>(`/ClassSession/${id}`);
  return data;
}

async function fetchClassSessionsByClassroomId(
  classroomId: string
): Promise<ApiClassSession[]> {
  const { data } = await api.get<ApiClassSession[]>(
    `/ClassSession/ByClassroom/${classroomId}`
  );
  return data;
}

async function fetchClassSessionsByTeacherId(
  teacherId: string
): Promise<ApiClassSession[]> {
  const { data } = await api.get<ApiClassSession[]>(
    `/ClassSession/ByTeacher/${teacherId}`
  );
  return data;
}

async function fetchClassSessionsBySubjectId(
  subjectId: string
): Promise<ApiClassSession[]> {
  const { data } = await api.get<ApiClassSession[]>(
    `/ClassSession/BySubject/${subjectId}`
  );
  return data;
}

async function createClassSession(
  dto: ClassSessionCreateDto
): Promise<ApiClassSession> {
  const { data } = await api.post<ApiClassSession>("/ClassSession", dto);
  return data;
}

async function updateClassSession(
  dto: ClassSessionUpdateDto
): Promise<ApiClassSession> {
  const { data } = await api.put<ApiClassSession>(
    `/ClassSession/${dto.id}`,
    dto
  );
  return data;
}

async function deleteClassSession(id: string): Promise<void> {
  await api.delete(`/ClassSession/${id}`);
}

// =============================
// React Query Hooks
// =============================
export function useClassSessions() {
  return useQuery({
    queryKey: ["classSessions"],
    queryFn: fetchClassSessions,
  });
}

export function useClassSession(id: string) {
  return useQuery({
    queryKey: ["classSessions", id],
    queryFn: () => fetchClassSessionById(id),
    enabled: !!id,
  });
}

export function useClassSessionsByClassroomId(classroomId: string) {
  return useQuery({
    queryKey: ["classSessions", "byClassroom", classroomId],
    queryFn: () => fetchClassSessionsByClassroomId(classroomId),
    enabled: !!classroomId,
  });
}

export function useClassSessionsByTeacherId(teacherId: string) {
  return useQuery({
    queryKey: ["classSessions", "byTeacher", teacherId],
    queryFn: () => fetchClassSessionsByTeacherId(teacherId),
    enabled: !!teacherId,
  });
}

export function useClassSessionsBySubjectId(subjectId: string) {
  return useQuery({
    queryKey: ["classSessions", "bySubject", subjectId],
    queryFn: () => fetchClassSessionsBySubjectId(subjectId),
    enabled: !!subjectId,
  });
}

export function useCreateClassSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClassSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classSessions"] });
    },
  });
}

export function useUpdateClassSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClassSession,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classSessions"] });
      queryClient.invalidateQueries({ queryKey: ["classSessions", data.id] });
    },
  });
}

export function useDeleteClassSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClassSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classSessions"] });
    },
  });
}
