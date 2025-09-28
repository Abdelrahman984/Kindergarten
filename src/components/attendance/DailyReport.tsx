// src/components/DailyReport.tsx
import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Search,
  MinusCircle,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import {
  useDailyStats,
  AttendanceReadDto,
  useAttendanceByDate,
} from "@/api/attendances";
import { useFilteredList } from "@/hooks/useFilteredList";
import { ApiClassroom, useClassrooms } from "@/api/classrooms";
import { attendanceStatusLabels } from "@/api/attendances";
import { useNavigate } from "react-router-dom";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import StatsCards from "../shared/StatsCards";
import { getPercentage } from "@/lib/utils";

interface DailyReportProps {
  date: string;
}

const DailyReport = ({ date }: DailyReportProps) => {
  const [selectedDate, setSelectedDate] = useState(date);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Fetch classrooms for dropdown
  const { data: classrooms } = useClassrooms();

  // Queries
  const {
    data: todayAttendanceData,
    isLoading,
    error,
  } = useAttendanceByDate(selectedDate);
  const { data: dailyStats, isLoading: loadingStats } =
    useDailyStats(selectedDate);

  // Filter attendance
  const todayAttendance: AttendanceReadDto[] = Array.isArray(
    todayAttendanceData
  )
    ? todayAttendanceData.filter((a) =>
        selectedClassroom ? a.classroomName === selectedClassroom : true
      )
    : [];

  const filtered = useFilteredList({
    list: todayAttendance,
    search,
    searchKey: "studentName",
    filters: [
      (s) => (selectedClassroom ? s.classroomName === selectedClassroom : true),
      (s) => (statusFilter !== "" ? String(s.status) === statusFilter : true),
    ],
  });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading || loadingStats) {
    return <SkeletonLoading />;
  }
  if (error)
    return (
      <p className="text-destructive">
        حدث خطأ أثناء جلب بيانات الحضور: {error?.message}
      </p>
    );

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <StatsCards
        stats={[
          {
            label: "إجمالي الطلاب",
            value: dailyStats?.totalRequired ?? 0,
            icon: <Users className="w-5 h-5 text-primary" />,
          },
          {
            label: "حاضر اليوم",
            value: dailyStats?.presentCount ?? 0,
            icon: <CheckCircle className="w-5 h-5 text-success" />,
            trend: `${getPercentage(
              dailyStats?.presentCount,
              dailyStats?.totalRequired
            )}`,
            isPositiveStat: true,
          },
          {
            label: "متأخر",
            value: dailyStats?.lateCount ?? 0,
            icon: <Clock className="w-5 h-5 text-warning" />,
            trend: `${getPercentage(
              dailyStats?.lateCount,
              dailyStats?.totalRequired
            )}`,
            isPositiveStat: false,
          },
          {
            label: "غائب",
            value: dailyStats?.absentCount ?? 0,
            icon: <XCircle className="w-5 h-5 text-destructive" />,
            trend: `${getPercentage(
              dailyStats?.absentCount,
              dailyStats?.totalRequired
            )}`,
            isPositiveStat: false,
          },
          {
            label: "غير محدد",
            value: dailyStats?.unmarkedCount ?? 0,
            icon: <MinusCircle className="w-5 h-5 text-muted-foreground" />,
            trend: `${getPercentage(
              dailyStats?.unmarkedCount,
              dailyStats?.totalRequired
            )}`,
            isPositiveStat: false,
          },
        ]}
        columns={5}
      />

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <CardTitle className="font-arabic text-right">
                حضور اليوم
              </CardTitle>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto flex-wrap min-w-0">
              {/* Search Input */}
              <div className="relative w-full md:w-64 min-w-0">
                <TextField
                  label="بحث"
                  placeholder="البحث عن طالب..."
                  variant="outlined"
                  size="small"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fullWidth
                />
              </div>
              {/* Classroom Dropdown */}
              <TextField
                select
                label="الفصل"
                variant="outlined"
                size="small"
                value={selectedClassroom}
                onChange={(e) => setSelectedClassroom(e.target.value)}
                className="w-full md:w-36 min-w-0"
              >
                <MenuItem value="">الكل</MenuItem>
                {classrooms?.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* Status Dropdown */}
              <TextField
                select
                label="الحالة"
                variant="outlined"
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-36 min-w-0"
              >
                <MenuItem value="">كل الحالات</MenuItem>
                {Object.entries(attendanceStatusLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>

              <DatePicker
                label={"التاريخ"}
                value={selectedDate ? new Date(selectedDate) : null}
                onChange={(newVal) => {
                  if (newVal instanceof Date && !isNaN(newVal.getTime())) {
                    setSelectedDate(format(newVal, "yyyy-MM-dd"));
                  } else {
                    setSelectedDate("");
                  }
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    className: "w-full md:w-40 min-w-0",
                  },
                }}
                className="w-full md:w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.length === 0 ? (
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
              <>
                <AttendanceTable data={paginated} />
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                      className="px-2 py-1 border rounded"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      السابق
                    </button>
                    <span className="font-arabic">
                      صفحة {page} من {totalPages}
                    </span>
                    <button
                      className="px-2 py-1 border rounded"
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                    >
                      التالي
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyReport;
