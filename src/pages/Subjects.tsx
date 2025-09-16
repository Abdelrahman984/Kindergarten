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
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Plus,
  Edit,
  Trash2,
  GraduationCap,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";

const Subjects = () => {
  const [activeSection, setActiveSection] = useState("subjects");
  const userRole = "admin" as const;

  const subjects = [
    {
      id: 1,
      name: "القرآن الكريم",
      description: "تحفيظ وتجويد القرآن الكريم",
      teacher: "أ. فاطمة أحمد",
      students: 25,
      hours: 8,
      progress: 85,
      color: "bg-green-500",
      goals: ["حفظ 3 سور قصيرة", "تعلم أحكام التجويد", "فهم معاني الآيات"],
      achievements: 12,
    },
    {
      id: 2,
      name: "اللغة العربية",
      description: "تعلم الحروف والكلمات والقراءة",
      teacher: "أ. خديجة محمد",
      students: 30,
      hours: 12,
      progress: 78,
      color: "bg-blue-500",
      goals: ["تعلم جميع الحروف", "قراءة الكلمات البسيطة", "كتابة الاسم"],
      achievements: 18,
    },
    {
      id: 3,
      name: "الرياضيات",
      description: "الأرقام والعد والعمليات البسيطة",
      teacher: "أ. عائشة علي",
      students: 28,
      hours: 10,
      progress: 92,
      color: "bg-purple-500",
      goals: ["العد من 1 إلى 20", "التعرف على الأشكال", "الجمع البسيط"],
      achievements: 15,
    },
    {
      id: 4,
      name: "العلوم",
      description: "استكشاف العالم المحيط",
      teacher: "أ. صفية حسن",
      students: 22,
      hours: 6,
      progress: 70,
      color: "bg-orange-500",
      goals: ["التعرف على الحيوانات", "فهم دورة المياه", "أجزاء النبات"],
      achievements: 8,
    },
    {
      id: 5,
      name: "الأنشطة الفنية",
      description: "الرسم والأشغال اليدوية",
      teacher: "أ. زينب سالم",
      students: 35,
      hours: 8,
      progress: 88,
      color: "bg-pink-500",
      goals: ["إنجاز 5 مشاريع فنية", "تعلم الألوان", "التعبير الإبداعي"],
      achievements: 20,
    },
    {
      id: 6,
      name: "التربية البدنية",
      description: "الألعاب والحركة والرياضة",
      teacher: "أ. خولة رشيد",
      students: 40,
      hours: 6,
      progress: 95,
      color: "bg-red-500",
      goals: ["تطوير المهارات الحركية", "الألعاب الجماعية", "النشاط اليومي"],
      achievements: 25,
    },
  ];

  const stats = [
    {
      label: "إجمالي المواد",
      value: "6",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "إجمالي الطلاب",
      value: "180",
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "ساعات التدريس",
      value: "50",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      label: "معدل الإنجاز",
      value: "85%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-arabic">
              المواد الدراسية
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة المناهج والمواد التعليمية
            </p>
          </div>
          <Button className="font-arabic">
            <Plus className="w-4 h-4 ml-2" />
            إضافة مادة جديدة
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground font-arabic">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subjects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full ${subject.color} flex items-center justify-center`}
                    >
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="font-arabic text-lg">
                        {subject.name}
                      </CardTitle>
                      <CardDescription className="font-arabic text-sm">
                        {subject.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Teacher Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {subject.teacher.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium font-arabic">
                      {subject.teacher}
                    </p>
                    <p className="text-xs text-muted-foreground">معلم المادة</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-arabic">تقدم المنهج</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      {subject.students}
                    </div>
                    <div className="text-xs text-muted-foreground font-arabic">
                      طالب
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      {subject.hours}
                    </div>
                    <div className="text-xs text-muted-foreground font-arabic">
                      ساعة
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      {subject.achievements}
                    </div>
                    <div className="text-xs text-muted-foreground font-arabic">
                      إنجاز
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <h4 className="text-sm font-medium mb-2 font-arabic flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    الأهداف التعليمية
                  </h4>
                  <div className="space-y-1">
                    {subject.goals.slice(0, 2).map((goal, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="font-arabic text-muted-foreground">
                          {goal}
                        </span>
                      </div>
                    ))}
                    {subject.goals.length > 2 && (
                      <div className="text-xs text-muted-foreground font-arabic">
                        +{subject.goals.length - 2} أهداف أخرى
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 font-arabic"
                  >
                    <GraduationCap className="w-4 h-4 ml-2" />
                    عرض الطلاب
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 font-arabic"
                  >
                    <Award className="w-4 h-4 ml-2" />
                    التقييمات
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Subjects;
