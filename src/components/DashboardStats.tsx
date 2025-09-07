import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  TrendingUp,
  BookOpen,
  Star
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, trendUp, className }: StatCardProps) => (
  <Card className={`hover:shadow-soft transition-smooth ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium font-arabic text-right">{title}</CardTitle>
      <div className="p-2 bg-gradient-islamic rounded-lg">
        <Icon className="h-4 w-4 text-primary-foreground" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold font-arabic text-right">{value}</div>
      {trend && (
        <div className="flex items-center justify-end mt-2">
          <Badge variant={trendUp ? "secondary" : "destructive"} className="text-xs font-arabic">
            <TrendingUp className={`w-3 h-3 ml-1 ${trendUp ? '' : 'rotate-180'}`} />
            {trend}
          </Badge>
        </div>
      )}
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  userRole: 'admin' | 'teacher' | 'parent';
}

const DashboardStats = ({ userRole }: DashboardStatsProps) => {
  if (userRole === 'admin') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي الطلاب"
          value="156"
          icon={Users}
          trend="+12 هذا الشهر"
          trendUp={true}
        />
        <StatCard
          title="المعلمين النشطين"
          value="24"
          icon={GraduationCap}
          trend="+2 هذا الشهر"
          trendUp={true}
        />
        <StatCard
          title="معدل الحضور"
          value="94%"
          icon={Calendar}
          trend="+2% من الأسبوع الماضي"
          trendUp={true}
        />
        <StatCard
          title="الفصول النشطة"
          value="8"
          icon={BookOpen}
          trend="مستقر"
          trendUp={true}
        />
      </div>
    );
  }

  if (userRole === 'teacher') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="طلاب صفي"
          value="22"
          icon={Users}
          trend="KG2-أ"
        />
        <StatCard
          title="حضور اليوم"
          value="20/22"
          icon={Calendar}
          trend="91%"
          trendUp={true}
        />
        <StatCard
          title="التقييمات المكتملة"
          value="18"
          icon={Star}
          trend="4 متبقية"
        />
      </div>
    );
  }

  // Parent view
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="أطفالي"
        value="2"
        icon={Users}
        trend="أحمد وفاطمة"
      />
      <StatCard
        title="حضور هذا الشهر"
        value="96%"
        icon={Calendar}
        trend="+2% من الشهر الماضي"
        trendUp={true}
      />
      <StatCard
        title="حفظ القرآن"
        value="15"
        icon={BookOpen}
        trend="آية جديدة"
        trendUp={true}
      />
    </div>
  );
};

export default DashboardStats;