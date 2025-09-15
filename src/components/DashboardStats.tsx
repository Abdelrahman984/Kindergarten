import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStudents } from "@/api/students";
import { useMyClassStudents, useTeachers } from "@/api/teachers";
import { useClassrooms } from "@/api/classrooms";
import {
  Users,
  GraduationCap,
  Calendar,
  TrendingUp,
  BookOpen,
  Star,
} from "lucide-react";
import { useMyChildren } from "@/api/parents";
import { useAttendanceTrends } from "@/api/attendances";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
}: StatCardProps) => (
  <Card className={`hover:shadow-soft transition-smooth ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium font-arabic text-right">
        {title}
      </CardTitle>
      <div className="p-2 bg-gradient-islamic rounded-lg">
        <Icon className="h-4 w-4 text-primary-foreground" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold font-arabic text-right">{value}</div>
      {trend && (
        <div className="flex items-center justify-end mt-2">
          <Badge
            variant={trendUp ? "secondary" : "destructive"}
            className="text-xs font-arabic"
          >
            <TrendingUp
              className={`w-3 h-3 ml-1 ${trendUp ? "" : "rotate-180"}`}
            />
            {trend}
          </Badge>
        </div>
      )}
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  userRole: "admin" | "teacher" | "parent";
  userId?: string; // ضروري للمعلم أو الوالد
}

const DashboardStats = ({ userRole, userId }: DashboardStatsProps) => {
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: teachers, isLoading: teachersLoading } = useTeachers();
  const { data: classrooms, isLoading: classroomsLoading } = useClassrooms();
  const { data: attendanceTrends, isLoading: attendanceLoading } =
    useAttendanceTrends();

  const loading =
    studentsLoading ||
    teachersLoading ||
    classroomsLoading ||
    attendanceLoading;

  // --- Admin view ---
  if (userRole === "admin") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي الطلاب"
          value={loading ? "..." : students?.length.toString() ?? "0"}
          icon={Users}
          trend="+12 هذا الشهر"
          trendUp={true}
        />
        <StatCard
          title="المعلمين النشطين"
          value={loading ? "..." : teachers?.length.toString() ?? "0"}
          icon={GraduationCap}
          trend="+2 هذا الشهر"
          trendUp={true}
        />
        <StatCard
          title="معدل الحضور هذا الشهر"
          value={
            loading
              ? "..."
              : `${attendanceTrends.thisMonthPercentage.toFixed(2)}%`
          } // لاحقًا يمكن ربط API
          icon={Calendar}
          trend="+2% من الأسبوع الماضي"
          trendUp={true}
        />
        <StatCard
          title="الفصول النشطة"
          value={loading ? "..." : classrooms?.length.toString() ?? "0"}
          icon={BookOpen}
          trend="مستقر"
          trendUp={true}
        />
      </div>
    );
  }

  // --- Teacher view ---
  if (userRole === "teacher") {
    const classCount = "30"; // placeholder
    const attendanceToday = "27"; // placeholder
    const completedAssessments = "18"; // placeholder
    const remainingAssessments = "4"; // placeholder

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="طلاب صفي"
          value={loading ? "..." : classCount.toString()}
          icon={Users}
          trend="KG2-أ"
        />
        <StatCard
          title="حضور اليوم"
          value={loading ? "..." : `${attendanceToday}/${classCount}`}
          icon={Calendar}
          trend="91%"
          trendUp={true}
        />
        <StatCard
          title="التقييمات المكتملة"
          value={loading ? "..." : completedAssessments.toString()}
          icon={Star}
          trend={`${remainingAssessments} متبقية`}
        />
      </div>
    );
  }

  // --- Parent view ---
  const childrenCount = "200"; // placeholder
  const monthlyAttendance = 96; // placeholder
  const memorizedVerses = 15; // placeholder

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="أطفالي"
        value={loading ? "..." : childrenCount.toString()}
        icon={Users}
        trend="+1 هذا الشهر "
      />
      <StatCard
        title="حضور هذا الشهر"
        value={loading ? "..." : `${monthlyAttendance}%`}
        icon={Calendar}
        trend="+2% من الشهر الماضي"
        trendUp={true}
      />
      <StatCard
        title="حفظ القرآن"
        value={loading ? "..." : memorizedVerses.toString()}
        icon={BookOpen}
        trend="آية جديدة"
        trendUp={true}
      />
    </div>
  );
};

export default DashboardStats;
