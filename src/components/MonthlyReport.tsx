// src/components/attendance/MonthlyReport.tsx
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
import { CheckCircle, XCircle, Clock, MinusCircle } from "lucide-react";
import { useMonthlyAttendance } from "@/api/attendances";

export default function MonthlyReport({ date }: { date: string }) {
  const { data: stats, isLoading } = useMonthlyAttendance(date);

  if (isLoading) return <p>Loading...</p>;
  if (!stats) return <p>لا توجد بيانات</p>;

  return (
    <div className="space-y-6">
      {/* نفس الكروت و الشارت زي الـ WeeklyReport */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.presentTotal}</div>
            <p className="text-sm font-arabic">الحضور</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <XCircle className="w-5 h-5 text-red-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.absentTotal}</div>
            <p className="text-sm font-arabic">الغياب</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-5 h-5 text-yellow-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.lateTotal}</div>
            <p className="text-sm font-arabic">التأخير</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MinusCircle className="w-5 h-5 text-gray-500 mx-auto" />
            <div className="text-2xl font-bold">{stats.unmarkedTotal}</div>
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
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString("ar-EG", { day: "numeric" })
                }
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
