// src/components/attendance/MonthlyReport.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkeletonLoading from "./SkeletonLoading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CheckCircle, XCircle, Clock, MinusCircle, Users } from "lucide-react";
import { useMonthlyAttendance } from "@/api/attendances";
import { getPercentage } from "@/lib/utils";

export default function MonthlyReport({ date }: { date: string }) {
  // Helper to check if a date is the current day
  const isCurrentDay = (d: string) => {
    const today = new Date(date);
    const day = new Date(d);
    return (
      today.getFullYear() === day.getFullYear() &&
      today.getMonth() === day.getMonth() &&
      today.getDate() === day.getDate()
    );
  };
  const { data: stats, isLoading } = useMonthlyAttendance(date);

  if (isLoading) return <SkeletonLoading />;
  if (!stats) return <p>لا توجد بيانات</p>;

  return (
    <div className="space-y-6">
      {/* نفس الكروت و الشارت زي الـ WeeklyReport */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-5 h-5 text-blue-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.totalRequired}</div>
            <p className="text-sm font-arabic">الحضور المطلوب</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.presentTotal}</div>
            <div>{getPercentage(stats.presentTotal, stats.totalRequired)}</div>
            <p className="text-sm font-arabic">الحضور</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <XCircle className="w-5 h-5 text-red-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.absentTotal}</div>
            <div>{getPercentage(stats.absentTotal, stats.totalRequired)}</div>
            <p className="text-sm font-arabic">الغياب</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-5 h-5 text-yellow-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.lateTotal}</div>
            <div>{getPercentage(stats.lateTotal, stats.totalRequired)}</div>
            <p className="text-sm font-arabic">التأخير</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MinusCircle className="w-5 h-5 text-gray-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.unmarkedTotal}</div>
            <div>{getPercentage(stats.unmarkedTotal, stats.totalRequired)}</div>
            <p className="text-sm font-arabic">غير محدد</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic text-right">
            إحصائيات الشهر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.breakdown}>
              <XAxis
                dataKey="date"
                interval={0}
                tick={({ x, y, payload, ...rest }) => {
                  const isToday = isCurrentDay(payload.value);
                  return (
                    <text
                      x={x}
                      y={y + 10}
                      textAnchor="middle"
                      fontWeight={isToday ? "bold" : "normal"}
                      fill={isToday ? "#2563eb" : "#64748b"}
                      fontSize={isToday ? 16 : 12}
                      {...rest}
                    >
                      {new Date(payload.value).toLocaleDateString("ar-EG", {
                        day: "numeric",
                      })}
                    </text>
                  );
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="presentCount" name="الحضور" fill="#22c55e" />
              <Bar dataKey="absentCount" name="الغياب" fill="#ef4444" />
              <Bar dataKey="lateCount" name="التأخير" fill="#eab308" />
              <Bar dataKey="unmarkedCount" name="غير محدد" fill="#9ca3af" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
