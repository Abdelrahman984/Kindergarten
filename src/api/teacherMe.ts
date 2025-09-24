// src/api/teacherMe.ts
import { useQuery } from "@tanstack/react-query";
import api from "./client";

export const useMyClassrooms = () =>
  useQuery({
    queryKey: ["me-classrooms"],
    queryFn: async () => {
      const { data } = await api.get("teacher/me/classrooms");
      return data;
    },
  });

export const useMySubject = () =>
  useQuery({
    queryKey: ["me-subject"],
    queryFn: async () => {
      const { data } = await api.get("teacher/me/subject");
      return data;
    },
  });

export const useMySessions = () =>
  useQuery({
    queryKey: ["me-sessions"],
    queryFn: async () => {
      const { data } = await api.get("teacher/me/sessions");
      return data;
    },
  });
