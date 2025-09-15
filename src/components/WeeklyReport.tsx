import StatsCards from "./StatsCards";
import SkeletonLoading from "./SkeletonLoading";
// src/components/attendance/WeeklyReport.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useWeeklyAttendance } from "@/api/attendances";
import { getPercentage } from "@/lib/utils";

export default function WeeklyReport({ date }: { date: string }) {
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
  const { data: stats, isLoading } = useWeeklyAttendance(date);

  if (isLoading) return <SkeletonLoading />;
  if (!stats) return <p>لا توجد بيانات</p>;

  return (
    <div className="space-y-6">
      {/* Totals */}
      <StatsCards
        columns={5}
        stats={[
          {
            label: "الحضور المطلوب",
            value: stats.totalRequired,
            icon: <Users className="w-5 h-5 text-blue-500 mx-auto" />,
          },
          {
            label: "الحضور",
            value: stats.presentTotal,
            icon: <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />,
            trend: `${getPercentage(stats.presentTotal, stats.totalRequired)}`,
            isPositiveStat: true,
          },
          {
            label: "الغياب",
            value: stats.absentTotal,
            icon: <XCircle className="w-5 h-5 text-red-500 mx-auto" />,
            trend: `${getPercentage(stats.absentTotal, stats.totalRequired)}`,
            isPositiveStat: false,
          },
          {
            label: "التأخير",
            value: stats.lateTotal,
            icon: <Clock className="w-5 h-5 text-yellow-500 mx-auto" />,
            trend: `${getPercentage(stats.lateTotal, stats.totalRequired)}`,
            isPositiveStat: false,
          },
          {
            label: "غير محدد",
            value: stats.unmarkedTotal,
            icon: <MinusCircle className="w-5 h-5 text-gray-500 mx-auto" />,
            trend: `${getPercentage(stats.unmarkedTotal, stats.totalRequired)}`,
            isPositiveStat: false,
          },
        ]}
      />

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic text-right">
            إحصائيات الأسبوع
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
                        month: "short",
                        day: "numeric",
                      })}
                    </text>
                  );
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="presentCount"
                name="الحضور"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                {...stats.breakdown.reduce((acc, entry, idx) => {
                  if (isCurrentDay(entry.date)) {
                    acc[idx] = { fill: "#2563eb" };
                  }
                  return acc;
                }, {})}
              />
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
