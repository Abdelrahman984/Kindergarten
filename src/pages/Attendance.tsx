import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from "lucide-react";

const Attendance = () => {
  const todayAttendance = [
    {
      id: 1,
      name: "أحمد محمد الأحمد",
      class: "الصف الأول",
      status: "حاضر",
      time: "07:30",
      parent: "محمد الأحمد",
    },
    {
      id: 2,
      name: "فاطمة علي السالم",
      class: "الصف الثاني",
      status: "متأخر",
      time: "08:15",
      parent: "علي السالم",
    },
    {
      id: 3,
      name: "عبدالله سعد الخالد",
      class: "الصف الأول",
      status: "غائب",
      time: "-",
      parent: "سعد الخالد",
    },
    {
      id: 4,
      name: "مريم حسن العلي",
      class: "الصف التمهيدي",
      status: "حاضر",
      time: "07:45",
      parent: "حسن العلي",
    },
    {
      id: 5,
      name: "يوسف أحمد البدر",
      class: "الصف الثاني",
      status: "حاضر",
      time: "07:25",
      parent: "أحمد البدر",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "حاضر":
        return (
          <Badge className="bg-success/10 text-success border-success/20 font-arabic">
            {status}
          </Badge>
        );
      case "متأخر":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 font-arabic">
            {status}
          </Badge>
        );
      case "غائب":
        return (
          <Badge variant="destructive" className="font-arabic">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="font-arabic">
            {status}
          </Badge>
        );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "حاضر":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "متأخر":
        return <Clock className="w-5 h-5 text-warning" />;
      case "غائب":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
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
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-arabic">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button className="font-arabic">
            <Calendar className="w-4 h-4 ml-2" />
            تسجيل الحضور
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold text-primary">85</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              إجمالي الطلاب
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div className="text-2xl font-bold text-success">78</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              حاضر اليوم
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-warning" />
              <div className="text-2xl font-bold text-warning">4</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">متأخر</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <div className="text-2xl font-bold text-destructive">3</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">غائب</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Tabs */}
      <Tabs defaultValue="today" className="w-full">
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
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-arabic text-right">
                  حضور اليوم
                </CardTitle>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث عن طالب..."
                    className="pr-10 w-64 text-right font-arabic"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAttendance.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex gap-3">
                      {getStatusIcon(student.status)}
                      {getStatusBadge(student.status)}
                    </div>

                    <div className="flex-1 grid grid-cols-4 gap-4 text-right">
                      <div>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs font-arabic">
                              {student.name.split(" ")[0].charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium font-arabic">
                              {student.name}
                            </p>
                            <p className="text-xs text-muted-foreground font-arabic">
                              {student.parent}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-arabic text-sm">{student.class}</p>
                      </div>

                      <div>
                        <p className="text-sm" dir="ltr">
                          {student.time}
                        </p>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 font-arabic"
                        >
                          تعديل
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 font-arabic"
                        >
                          إشعار
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                التقرير الأسبوعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-arabic">
                  سيتم عرض التقرير الأسبوعي هنا
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                التقرير الشهري
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-arabic">
                  سيتم عرض التقرير الشهري هنا
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
