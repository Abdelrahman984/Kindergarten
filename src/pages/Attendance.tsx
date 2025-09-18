// src/pages/Attendance.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import WeeklyReport from "@/components/attendance/WeeklyReport";
import MonthlyReport from "@/components/attendance/MonthlyReport";
import DailyReport from "@/components/attendance/DailyReport";

const Attendance = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6 p-6">
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
            تسجيل حضور اليوم
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
          <DailyReport date={today} />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <WeeklyReport date={today} />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <MonthlyReport date={today} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
