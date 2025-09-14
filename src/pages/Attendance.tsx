// src/pages/Attendance.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Calendar,
  Search,
  AlertCircle,
  MinusCircle,
} from "lucide-react";
import {
  useDailyStats,
  AttendanceReadDto,
  useTodayAttendance,
} from "@/api/attendances";
import { ApiClassroom, useClassrooms } from "@/api/classrooms";
import { useNavigate } from "react-router-dom";
import { useStudents } from "@/api/students";
import AttendanceTable from "@/components/AttendanceTable";
import WeeklyReport from "@/components/WeeklyReport";
import MonthlyReport from "@/components/MonthlyReport";
import DailyReport from "@/components/DailyReport";

const Attendance = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: students, isLoading, isError } = useStudents();
  const { data: classrooms = [] } = useClassrooms();
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  // -------- Queries --------
  const {
    data: todayAttendanceData,
    isLoading: loadingAttendance,
    error: todayAttendanceError,
  } = useTodayAttendance();

  const { data: dailyStats, isLoading: loadingStats } = useDailyStats();

  // Filter students by classroom for stats
  const filteredStudents = selectedClassroom
    ? Array.isArray(students)
      ? students.filter((s) => s.classroomName === selectedClassroom)
      : []
    : Array.isArray(students)
    ? students
    : [];
  const totalStudents = filteredStudents.length;
  // Default empty array
  const todayAttendance: AttendanceReadDto[] = Array.isArray(
    todayAttendanceData
  )
    ? todayAttendanceData.filter((a) =>
        selectedClassroom ? a.classroomName === selectedClassroom : true
      )
    : [];

  // Filter by search and classroom
  const filteredAttendance = todayAttendance.filter((s) => {
    const matchesSearch = s.studentName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesClassroom = selectedClassroom
      ? s.classroomName === selectedClassroom
      : true;
    const matchesStatus =
      statusFilter !== "" ? String(s.status) === statusFilter : true;
    return matchesSearch && matchesClassroom && matchesStatus;
  });

  if (loadingAttendance) return <p>جاري تحميل الحضور...</p>;
  if (todayAttendanceError)
    return (
      <p className="text-destructive">
        حدث خطأ أثناء جلب بيانات الحضور: {todayAttendanceError?.message}
      </p>
    );

  return (
    <div className="space-y-6 p-6">
      {/* Attendance Tabs */}
      <Tabs dir="rtl" defaultValue="today" className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-right">
            <h1 className="text-3xl font-bold font-arabic">الحضور والغياب</h1>
            <p className="text-muted-foreground font-arabic">
              {new Date().toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
            {/* التقويم الميلادي */}
            <p className="text-muted-foreground font-arabic">
              {new Date().toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
          {/* زرار الانتقال لتسجيل الحضور */}
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={() => navigate("/mark-attendance")} // <--- هنا الرابط
          >
            تسجيل الحضور
          </button>
        </div>

        {/* Tabs List */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="font-arabic">
            اليوم
          </TabsTrigger>
          <TabsTrigger value="weekly" className="font-arabic">
            أسبوعي
          </TabsTrigger>
          <TabsTrigger value="monthly" className="font-arabic">
            شهري
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <DailyReport />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <WeeklyReport date="2025-09-13" />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <MonthlyReport date="2025-09-01" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
