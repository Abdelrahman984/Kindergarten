// src/api/attendances.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

// ------------------- DTOs -------------------

// Enum mapping مع backend
export type AttendanceStatus = 0 | 1 | 2 | 3;
// 0: Unmarked, 1: Present, 2: Absent, 3: Late

export const attendanceStatusLabels: Record<AttendanceStatus, string> = {
  0: "Unmarked",
  1: "Present",
  2: "Absent",
  3: "Late",
};

export interface AttendanceReadDto {
  id: string;
  studentId: string;
  studentName: string;
  date: string; // UTC
  status: AttendanceStatus;
  notes?: string;
  classroomId?: string;
  classroomName?: string;
  arrivalTime?: string;
}

export interface AttendanceCreateDto {
  studentId: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  arrivalTime?: string;
}

export interface DayStats {
  date: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  unmarkedCount: number;
}

export interface WeeklyStats {
  startDate: string;
  endDate: string;
  presentTotal: number;
  absentTotal: number;
  lateTotal: number;
  unmarkedTotal: number;
  breakdown: DayStats[];
}

export interface MonthlyStats {
  startDate: string;
  endDate: string;
  presentTotal: number;
  absentTotal: number;
  lateTotal: number;
  unmarkedTotal: number;
  breakdown: DayStats[];
}

export interface AttendanceTrendDto {
  todayPercentage: number;
  thisWeekPercentage: number;
  thisMonthPercentage: number;
}

export interface StudentAttendancePercentageDto {
  studentId: string;
  studentName: string;
  percentage: number;
}

// ------------------- Queries -------------------

// جلب حضور يوم محدد
export const useAttendanceByDate = (date: string) =>
  useQuery<AttendanceReadDto[], Error>({
    queryKey: ["attendance/by-date", date],
    queryFn: async (): Promise<AttendanceReadDto[]> => {
      const { data } = await api.get<AttendanceReadDto[]>(
        `/attendance/by-date/${date}`
      );
      return data;
    },
  });

export const useTodayAttendance = () => {
  const today = new Date().toISOString().split("T")[0];
  return useAttendanceByDate(today);
};

// جلب حضور طالب محدد
export const useAttendanceByStudent = (studentId: string) =>
  useQuery<AttendanceReadDto[]>({
    queryKey: ["attendance/student", studentId],
    queryFn: async (): Promise<AttendanceReadDto[]> => {
      const { data } = await api.get<AttendanceReadDto[]>(
        `/attendance/student/${studentId}`
      );
      return data;
    },
  });

// نسبة حضور طالب محدد
export const useStudentAttendancePercentage = (studentId: string) =>
  useQuery<number>({
    queryKey: ["attendance/student/percentage", studentId],
    queryFn: async (): Promise<number> => {
      const { data } = await api.get<number>(
        `/attendance/student/${studentId}/percentage`
      );
      return data;
    },
  });

// نسبة حضور كل الطلاب
export const useAllStudentsPercentages = () =>
  useQuery<StudentAttendancePercentageDto[]>({
    queryKey: ["attendance/students/percentages"],
    queryFn: async (): Promise<StudentAttendancePercentageDto[]> => {
      const { data } = await api.get<StudentAttendancePercentageDto[]>(
        `/attendance/students/percentages`
      );
      return data;
    },
  });

// النسبة العامة للحضور
export const useOverallAttendancePercentage = () =>
  useQuery<number>({
    queryKey: ["attendance/overall"],
    queryFn: async (): Promise<number> => {
      const { data } = await api.get<number>("/attendance/overall");
      return data;
    },
  });

// إحصائيات اليوم
export const useDailyStats = (date?: string) => {
  const queryDate = date ?? new Date().toISOString().split("T")[0];
  return useQuery<DayStats>({
    queryKey: ["attendance/dailyStats", queryDate],
    queryFn: async (): Promise<DayStats> => {
      const { data } = await api.get<DayStats>(
        `/attendance/daily/stats?date=${queryDate}`
      );
      return data;
    },
  });
};
export const useWeeklyAttendance = (date: string) =>
  useQuery<WeeklyStats>({
    queryKey: ["weeklyAttendance", date],
    queryFn: async (): Promise<WeeklyStats> => {
      const { data } = await api.get<WeeklyStats>(
        `/attendance/weekly/report?date=${date}`
      );
      return data;
    },
  });

// Monthly
export const useMonthlyAttendance = (date: string) =>
  useQuery<MonthlyStats>({
    queryKey: ["monthlyAttendance", date],
    queryFn: async (): Promise<MonthlyStats> => {
      const { data } = await api.get<MonthlyStats>(
        `/attendance/monthly/report?date=${date}`
      );
      return data;
    },
  });

// إحصائيات trends
export const useAttendanceTrends = () =>
  useQuery<AttendanceTrendDto>({
    queryKey: ["attendance/trends"],
    queryFn: async (): Promise<AttendanceTrendDto> => {
      const { data } = await api.get<AttendanceTrendDto>("/attendance/trends");
      return data;
    },
  });

// حضور اليوم مع unmarked
export const useDailyWithUnmarked = (date: string) =>
  useQuery<AttendanceReadDto[]>({
    queryKey: ["attendance/daily/full", date],
    queryFn: async (): Promise<AttendanceReadDto[]> => {
      const { data } = await api.get<AttendanceReadDto[]>(
        `/attendance/daily/full?date=${date}`
      );
      return data;
    },
  });

// ------------------- Mutations -------------------

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation<AttendanceReadDto, Error, AttendanceCreateDto>({
    mutationFn: async (payload: AttendanceCreateDto) => {
      const { data } = await api.post<AttendanceReadDto>(
        "/attendance",
        payload
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["attendance/dailyStats"] });
      queryClient.invalidateQueries({ queryKey: ["attendance/trends"] });
      queryClient.invalidateQueries({ queryKey: ["attendance/overall"] });
      queryClient.invalidateQueries({
        queryKey: ["attendance/date", variables.date],
      });
      queryClient.invalidateQueries({
        queryKey: ["attendance/daily/full", variables.date],
      });
    },
  });
};
