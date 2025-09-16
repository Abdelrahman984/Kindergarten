import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Users,
  UserCheck,
  Calendar,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

const ClassroomManagement = () => {
  const [activeSection, setActiveSection] = useState("classroom");
  const userRole = "admin" as const;

  const classrooms = [
    {
      id: 1,
      name: "الفصل الأول",
      capacity: 20,
      currentStudents: 18,
      teacher: "أ. فاطمة أحمد",
      ageGroup: "4-5 سنوات",
      status: "active",
      room: "الطابق الأرضي - غرفة 101",
      schedule: "8:00 ص - 12:00 م",
      subjects: ["القرآن", "العربية", "الرياضيات"],
      attendance: 94,
      performance: 88,
    },
    {
      id: 2,
      name: "الفصل الثاني",
      capacity: 15,
      currentStudents: 15,
      teacher: "أ. خديجة محمد",
      ageGroup: "3-4 سنوات",
      status: "active",
      room: "الطابق الأرضي - غرفة 102",
      schedule: "8:30 ص - 12:30 م",
      subjects: ["الأنشطة", "الفنون", "الموسيقى"],
      attendance: 96,
      performance: 92,
    },
    {
      id: 3,
      name: "الفصل الثالث",
      capacity: 25,
      currentStudents: 22,
      teacher: "أ. عائشة علي",
      ageGroup: "5-6 سنوات",
      status: "active",
      room: "الطابق الأول - غرفة 201",
      schedule: "8:00 ص - 1:00 م",
      subjects: ["العلوم", "الإنجليزية", "الحاسوب"],
      attendance: 89,
      performance: 85,
    },
    {
      id: 4,
      name: "الفصل الرابع",
      capacity: 18,
      currentStudents: 12,
      teacher: "أ. زينب سالم",
      ageGroup: "4-5 سنوات",
      status: "maintenance",
      room: "الطابق الأول - غرفة 202",
      schedule: "مغلق مؤقتاً",
      subjects: [],
      attendance: 0,
      performance: 0,
    },
  ];

  const dailyActivities = [
    { time: "8:00 - 8:30", activity: "استقبال الأطفال", status: "completed" },
    {
      time: "8:30 - 9:30",
      activity: "حلقة القرآن الكريم",
      status: "completed",
    },
    { time: "9:30 - 10:00", activity: "وجبة الإفطار", status: "completed" },
    { time: "10:00 - 11:00", activity: "درس الرياضيات", status: "current" },
    { time: "11:00 - 11:30", activity: "استراحة ولعب", status: "pending" },
    { time: "11:30 - 12:30", activity: "الأنشطة الفنية", status: "pending" },
  ];

  const alerts = [
    { type: "warning", message: "الفصل الرابع مغلق للصيانة", priority: "high" },
    {
      type: "info",
      message: "اجتماع المعلمين غداً الساعة 2:00 م",
      priority: "medium",
    },
    {
      type: "success",
      message: "تم تحديث جدول الفصل الأول بنجاح",
      priority: "low",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="font-arabic">
            نشط
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="destructive" className="font-arabic">
            صيانة
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="font-arabic">
            غير محدد
          </Badge>
        );
    }
  };

  const getOccupancyColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-arabic">
              إدارة الفصول
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة وتنظيم الفصول الدراسية
            </p>
          </div>
          <Button className="font-arabic">
            <Plus className="w-4 h-4 ml-2" />
            إضافة فصل جديد
          </Button>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border flex items-center gap-3 ${
                  alert.type === "warning"
                    ? "bg-orange-50 border-orange-200"
                    : alert.type === "success"
                    ? "bg-green-50 border-green-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                {alert.type === "warning" && (
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                )}
                {alert.type === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {alert.type === "info" && (
                  <Activity className="w-5 h-5 text-blue-600" />
                )}
                <span className="font-arabic">{alert.message}</span>
              </div>
            ))}
          </div>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="font-arabic">
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="activities" className="font-arabic">
              الأنشطة اليومية
            </TabsTrigger>
            <TabsTrigger value="resources" className="font-arabic">
              الموارد
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground font-arabic">
                        إجمالي الفصول
                      </p>
                      <p className="text-2xl font-bold text-foreground">4</p>
                    </div>
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground font-arabic">
                        الفصول النشطة
                      </p>
                      <p className="text-2xl font-bold text-foreground">3</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground font-arabic">
                        إجمالي الطلاب
                      </p>
                      <p className="text-2xl font-bold text-foreground">67</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground font-arabic">
                        معدل الحضور
                      </p>
                      <p className="text-2xl font-bold text-foreground">93%</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Classrooms Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {classrooms.map((classroom) => (
                <Card
                  key={classroom.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-arabic text-xl">
                          {classroom.name}
                        </CardTitle>
                        <CardDescription className="font-arabic">
                          {classroom.ageGroup} • {classroom.room}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(classroom.status)}
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Teacher Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {classroom.teacher.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium font-arabic">
                          {classroom.teacher}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          معلم الفصل
                        </p>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-arabic">الإشغال</span>
                        <span
                          className={getOccupancyColor(
                            classroom.currentStudents,
                            classroom.capacity
                          )}
                        >
                          {classroom.currentStudents}/{classroom.capacity}
                        </span>
                      </div>
                      <Progress
                        value={
                          (classroom.currentStudents / classroom.capacity) * 100
                        }
                        className="h-2"
                      />
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-arabic">
                        {classroom.schedule}
                      </span>
                    </div>

                    {/* Subjects */}
                    <div>
                      <p className="text-sm font-medium mb-2 font-arabic">
                        المواد الدراسية:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {classroom.subjects.map((subject, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="font-arabic text-xs"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    {classroom.status === "active" && (
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {classroom.attendance}%
                          </div>
                          <div className="text-xs text-muted-foreground font-arabic">
                            الحضور
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {classroom.performance}%
                          </div>
                          <div className="text-xs text-muted-foreground font-arabic">
                            الأداء
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">
                  الأنشطة اليومية - الأحد
                </CardTitle>
                <CardDescription>15 يناير 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg border"
                    >
                      <div className="text-center min-w-[80px]">
                        <div className="font-medium text-sm">
                          {activity.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium font-arabic">
                          {activity.activity}
                        </h4>
                      </div>
                      <div>
                        {activity.status === "completed" && (
                          <Badge
                            variant="default"
                            className="font-arabic bg-green-500"
                          >
                            مكتمل
                          </Badge>
                        )}
                        {activity.status === "current" && (
                          <Badge
                            variant="default"
                            className="font-arabic bg-blue-500"
                          >
                            جاري
                          </Badge>
                        )}
                        {activity.status === "pending" && (
                          <Badge variant="outline" className="font-arabic">
                            قادم
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    المواد التعليمية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-arabic">الكتب</span>
                      <span>45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-arabic">الألعاب التعليمية</span>
                      <span>32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-arabic">الوسائل البصرية</span>
                      <span>28</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    المرافق
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-arabic">قاعة الأنشطة</span>
                      <Badge variant="outline">متاح</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-arabic">المكتبة</span>
                      <Badge variant="outline">متاح</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-arabic">الملعب</span>
                      <Badge variant="destructive">مشغول</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    التقييمات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-arabic">تقييم الآباء</span>
                      <span>4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-arabic">رضا المعلمين</span>
                      <span>4.5/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-arabic">جودة البيئة</span>
                      <span>4.9/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ClassroomManagement;
