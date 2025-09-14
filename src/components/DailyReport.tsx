// src/components/DailyReport.tsx
import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Search,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AttendanceTable from "@/components/AttendanceTable";
import {
  useDailyStats,
  AttendanceReadDto,
  useTodayAttendance,
} from "@/api/attendances";
import { ApiClassroom, useClassrooms } from "@/api/classrooms";
import { useStudents } from "@/api/students";
import { useNavigate } from "react-router-dom";

const DailyReport = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: students } = useStudents();
  const { data: classrooms = [] } = useClassrooms();
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Queries
  const { data: todayAttendanceData, isLoading, error } = useTodayAttendance();
  const { data: dailyStats, isLoading: loadingStats } = useDailyStats();

  // Filter students
  const filteredStudents = selectedClassroom
    ? Array.isArray(students)
      ? students.filter((s) => s.classroomName === selectedClassroom)
      : []
    : Array.isArray(students)
    ? students
    : [];
  const totalStudents = filteredStudents.length;

  // Filter attendance
  const todayAttendance: AttendanceReadDto[] = Array.isArray(
    todayAttendanceData
  )
    ? todayAttendanceData.filter((a) =>
        selectedClassroom ? a.classroomName === selectedClassroom : true
      )
    : [];

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

  if (isLoading) return <p>جاري تحميل الحضور...</p>;
  if (error)
    return (
      <p className="text-destructive">
        حدث خطأ أثناء جلب بيانات الحضور: {error?.message}
      </p>
    );

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold text-primary">
                {totalStudents}
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              إجمالي الطلاب
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div className="text-2xl font-bold text-success">
                {todayAttendance.filter((a) => a.status === 1).length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              حاضر اليوم
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-warning" />
              <div className="text-2xl font-bold text-warning">
                {todayAttendance.filter((a) => a.status === 3).length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">متأخر</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <div className="text-2xl font-bold text-destructive">
                {todayAttendance.filter((a) => a.status === 2).length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">غائب</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MinusCircle className="w-5 h-5 text-muted-foreground" />
              <div className="text-2xl font-bold text-muted-foreground">
                {loadingStats ? "..." : dailyStats?.unmarkedCount ?? 0}
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              غير محدد
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-arabic text-right">حضور اليوم</CardTitle>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث عن طالب..."
                className="pr-10 w-64 text-right font-arabic"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAttendance.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-arabic text-lg">
                  لم يتم تسجيل حضور اليوم بعد
                </p>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-lg mt-5"
                  onClick={() => navigate("/mark-attendance")}
                >
                  تسجيل الحضور
                </button>
              </div>
            ) : (
              <AttendanceTable data={filteredAttendance} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyReport;
