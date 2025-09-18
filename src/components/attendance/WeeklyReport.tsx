import StatsCards from "../shared/StatsCards";
import SkeletonLoading from "../shared/SkeletonLoading";
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

import { useState } from "react";

export default function WeeklyReport({ date }: { date: string }) {
  // Helper to check if a date is the current day
  const [selectedDate, setSelectedDate] = useState(date);

  const isCurrentDay = (d: string) => {
    const today = new Date(date);
    const day = new Date(d);
    return (
      today.getFullYear() === day.getFullYear() &&
      today.getMonth() === day.getMonth() &&
      today.getDate() === day.getDate()
    );
  };
  const { data: stats, isLoading } = useWeeklyAttendance(selectedDate);

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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-arabic text-right">
            إحصائيات الأسبوع
          </CardTitle>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-2 py-1 text-right font-arabic ml-4"
            style={{ minWidth: 120 }}
          />
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
                label={{
                  value: "اليوم",
                  position: "insideBottom",
                  offset: -10,
                  style: {
                    textAnchor: "middle",
                    fontSize: 14,
                    fontFamily: "inherit",
                  },
                }}
              />
              <YAxis
                label={{
                  value: "عدد الطلاب",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                    fontSize: 14,
                    fontFamily: "inherit",
                  },
                }}
                tick={{ dx: -20 }} // ← يحرك الأرقام لليسار بمقدار 20px
              />
              <Tooltip
                formatter={(value, name, props) => value}
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString("ar-EG", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <Legend wrapperStyle={{ marginBottom: -20 }} />
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
