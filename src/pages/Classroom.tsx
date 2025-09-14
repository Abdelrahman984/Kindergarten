import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Star,
  Plus,
  Edit,
} from "lucide-react";

const Classroom = () => {
  const classrooms = [
    {
      id: 1,
      name: "الصف التمهيدي",
      teacher: "خديجة سالم",
      studentsCount: 15,
      capacity: 20,
      schedule: "8:00 - 12:00",
      activities: ["تحفيظ القرآن", "الحروف العربية", "الأرقام"],
      currentActivity: "تحفيظ سورة الفاتحة",
    },
    {
      id: 2,
      name: "الصف الأول",
      teacher: "أميرة أحمد",
      studentsCount: 18,
      capacity: 20,
      schedule: "8:00 - 1:00",
      activities: ["القراءة", "الكتابة", "الحساب", "التربية الإسلامية"],
      currentActivity: "درس الوضوء",
    },
    {
      id: 3,
      name: "الصف الثاني",
      teacher: "فاطمة محمد",
      studentsCount: 16,
      capacity: 18,
      schedule: "8:00 - 1:30",
      activities: ["القرآن الكريم", "اللغة العربية", "الرياضيات"],
      currentActivity: "حفظ سورة البقرة",
    },
  ];

  const students = [
    { id: 1, name: "أحمد محمد", attendance: "حاضر", performance: 85 },
    { id: 2, name: "فاطمة علي", attendance: "حاضر", performance: 92 },
    { id: 3, name: "عمر حسن", attendance: "غائب", performance: 78 },
    { id: 4, name: "عائشة سالم", attendance: "حاضر", performance: 88 },
    { id: 5, name: "يوسف أحمد", attendance: "حاضر", performance: 95 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-3xl font-bold font-arabic">
            إدارة الفصول الدراسية
          </h1>
          <p className="text-muted-foreground font-arabic">
            إدارة الفصول والأنشطة التعليمية
          </p>
        </div>
        <Button className="font-arabic">
          <Plus className="w-4 h-4 ml-2" />
          إضافة فصل جديد
        </Button>
      </div>

      {/* Classrooms Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {classrooms.map((classroom) => (
          <Card
            key={classroom.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-arabic text-right">
                  {classroom.name}
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className="font-arabic text-sm text-muted-foreground">
                  {classroom.teacher}
                </span>
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Activity */}
              <div className="p-3 bg-gradient-islamic/10 rounded-lg">
                <p className="font-arabic text-sm font-medium">
                  النشاط الحالي:
                </p>
                <p className="font-arabic text-sm text-muted-foreground">
                  {classroom.currentActivity}
                </p>
              </div>

              {/* Students Count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-right">
                  <span className="font-arabic text-sm">عدد الطلاب</span>
                  <span className="text-sm">
                    {classroom.studentsCount}/{classroom.capacity}
                  </span>
                </div>
                <Progress
                  value={(classroom.studentsCount / classroom.capacity) * 100}
                  className="h-2"
                />
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2 text-right">
                <div className="flex-1 text-right">
                  <p className="font-arabic text-sm">{classroom.schedule}</p>
                </div>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Activities */}
              <div className="space-y-2">
                <p className="font-arabic text-sm font-medium">الأنشطة:</p>
                <div className="flex flex-wrap gap-1">
                  {classroom.activities.map((activity, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="font-arabic text-xs"
                    >
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full font-arabic">
                عرض تفاصيل الفصل
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Classroom Details */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-arabic text-right">
              تفاصيل الصف الأول
            </CardTitle>
            <Badge className="font-arabic">نشط الآن</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Students List */}
            <div className="space-y-4">
              <h3 className="font-arabic font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                قائمة الطلاب
              </h3>
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs font-arabic bg-gradient-islamic text-primary-foreground">
                          {student.name.split(" ")[0].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-right">
                        <p className="font-arabic text-sm font-medium">
                          {student.name}
                        </p>
                        <Badge
                          variant={
                            student.attendance === "حاضر"
                              ? "default"
                              : "destructive"
                          }
                          className="font-arabic text-xs"
                        >
                          {student.attendance}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {student.performance}%
                      </span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="space-y-4">
              <h3 className="font-arabic font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                جدول اليوم
              </h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-arabic text-sm font-medium">
                      تحفيظ القرآن
                    </p>
                    <span className="text-xs text-muted-foreground" dir="ltr">
                      8:00 - 9:00
                    </span>
                  </div>
                  <Badge variant="default" className="font-arabic text-xs">
                    جاري الآن
                  </Badge>
                </div>

                <div className="p-3 border rounded-lg opacity-60">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-arabic text-sm font-medium">
                      اللغة العربية
                    </p>
                    <span className="text-xs text-muted-foreground" dir="ltr">
                      9:00 - 10:00
                    </span>
                  </div>
                </div>

                <div className="p-3 border rounded-lg opacity-60">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-arabic text-sm font-medium">استراحة</p>
                    <span className="text-xs text-muted-foreground" dir="ltr">
                      10:00 - 10:30
                    </span>
                  </div>
                </div>

                <div className="p-3 border rounded-lg opacity-60">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-arabic text-sm font-medium">الرياضيات</p>
                    <span className="text-xs text-muted-foreground" dir="ltr">
                      10:30 - 11:30
                    </span>
                  </div>
                </div>

                <div className="p-3 border rounded-lg opacity-60">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-arabic text-sm font-medium">
                      النشاط الحركي
                    </p>
                    <span className="text-xs text-muted-foreground" dir="ltr">
                      11:30 - 12:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-sm text-muted-foreground font-arabic">
              إجمالي الفصول
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-success">49</div>
            <p className="text-sm text-muted-foreground font-arabic">
              إجمالي الطلاب
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning">85%</div>
            <p className="text-sm text-muted-foreground font-arabic">
              معدل الحضور
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-muted-foreground">88%</div>
            <p className="text-sm text-muted-foreground font-arabic">
              متوسط الأداء
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Classroom;
