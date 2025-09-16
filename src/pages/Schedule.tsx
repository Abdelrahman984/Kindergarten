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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  BookOpen,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const Schedule = () => {
  const [activeSection, setActiveSection] = useState("schedule");
  const userRole = "admin" as const;

  const weeklySchedule = [
    {
      day: "الأحد",
      classes: [
        {
          time: "8:00 - 9:00",
          subject: "القرآن الكريم",
          teacher: "أ. فاطمة",
          room: "الفصل الأول",
          students: 15,
        },
        {
          time: "9:00 - 10:00",
          subject: "الرياضيات",
          teacher: "أ. عائشة",
          room: "الفصل الثاني",
          students: 12,
        },
        {
          time: "10:30 - 11:30",
          subject: "اللغة العربية",
          teacher: "أ. خديجة",
          room: "الفصل الأول",
          students: 15,
        },
        {
          time: "11:30 - 12:30",
          subject: "الأنشطة الفنية",
          teacher: "أ. زينب",
          room: "قاعة الأنشطة",
          students: 20,
        },
      ],
    },
    {
      day: "الاثنين",
      classes: [
        {
          time: "8:00 - 9:00",
          subject: "التربية الإسلامية",
          teacher: "أ. مريم",
          room: "الفصل الأول",
          students: 15,
        },
        {
          time: "9:00 - 10:00",
          subject: "العلوم",
          teacher: "أ. صفية",
          room: "معمل العلوم",
          students: 10,
        },
        {
          time: "10:30 - 11:30",
          subject: "اللغة الإنجليزية",
          teacher: "أ. عائشة",
          room: "الفصل الثاني",
          students: 12,
        },
        {
          time: "11:30 - 12:30",
          subject: "الرياضة",
          teacher: "أ. خولة",
          room: "الملعب",
          students: 25,
        },
      ],
    },
  ];

  const upcomingEvents = [
    {
      date: "2024-01-15",
      title: "يوم مفتوح للآباء",
      type: "فعالية",
      time: "10:00 ص",
    },
    {
      date: "2024-01-18",
      title: "مسابقة تحفيظ القرآن",
      type: "مسابقة",
      time: "9:00 ص",
    },
    { date: "2024-01-20", title: "رحلة تعليمية", type: "رحلة", time: "8:00 ص" },
    {
      date: "2024-01-22",
      title: "حفل تكريم المتفوقين",
      type: "حفل",
      time: "11:00 ص",
    },
  ];

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-arabic">
              الجدول الدراسي
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة الجداول والمواعيد
            </p>
          </div>
          <Button className="font-arabic">
            <Plus className="w-4 h-4 ml-2" />
            إضافة حصة جديدة
          </Button>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly" className="font-arabic">
              الجدول الأسبوعي
            </TabsTrigger>
            <TabsTrigger value="daily" className="font-arabic">
              الجدول اليومي
            </TabsTrigger>
            <TabsTrigger value="events" className="font-arabic">
              الفعاليات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid gap-6">
              {weeklySchedule.map((day, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-arabic text-xl">
                      {day.day}
                    </CardTitle>
                    <CardDescription>
                      {day.classes.length} حصص دراسية
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {day.classes.map((classItem, classIndex) => (
                        <div
                          key={classIndex}
                          className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="font-medium">
                                {classItem.time}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-secondary" />
                              <span className="font-arabic font-medium">
                                {classItem.subject}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {classItem.teacher.split(" ")[1]?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground font-arabic">
                                {classItem.teacher}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground font-arabic">
                                  {classItem.room}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <Badge
                                  variant="secondary"
                                  className="font-arabic"
                                >
                                  {classItem.students} طالب
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">
                  جدول اليوم - الأحد
                </CardTitle>
                <CardDescription>15 يناير 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklySchedule[0].classes.map((classItem, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-medium">
                            {classItem.time.split(" - ")[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            إلى
                          </div>
                          <div className="font-medium">
                            {classItem.time.split(" - ")[1]}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium font-arabic">
                            {classItem.subject}
                          </h4>
                          <p className="text-sm text-muted-foreground font-arabic">
                            {classItem.teacher} - {classItem.room}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-arabic">
                        {classItem.students} طالب
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium font-arabic">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date} - {event.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-arabic">
                        {event.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Schedule;
