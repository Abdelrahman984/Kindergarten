import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Award,
  Users,
  Clock,
  MapPin,
} from "lucide-react";

const MyClassroom = () => {
  const classroomInfo = {
    name: "الفصل الأول - المستوى التمهيدي",
    capacity: 25,
    currentStudents: 22,
    teacher: "أستاذة فاطمة أحمد",
    location: "الغرفة 101",
  };

  const students = [
    {
      id: 1,
      name: "أحمد محمد",
      avatar: "/placeholder.svg",
      attendance: 95,
      quranProgress: 80,
      islamicStudies: 90,
      behavior: "ممتاز",
      lastActivity: "اليوم",
      nextLesson: "سورة الفاتحة",
      status: "حاضر",
    },
    {
      id: 2,
      name: "فاطمة علي",
      avatar: "/placeholder.svg",
      attendance: 88,
      quranProgress: 75,
      islamicStudies: 85,
      behavior: "جيد جداً",
      lastActivity: "أمس",
      nextLesson: "آداب الطعام",
      status: "حاضر",
    },
    {
      id: 3,
      name: "عبدالله سعد",
      avatar: "/placeholder.svg",
      attendance: 92,
      quranProgress: 65,
      islamicStudies: 78,
      behavior: "جيد",
      lastActivity: "اليوم",
      nextLesson: "سورة الإخلاص",
      status: "غائب",
    },
    {
      id: 4,
      name: "عائشة أحمد",
      avatar: "/placeholder.svg",
      attendance: 97,
      quranProgress: 90,
      islamicStudies: 95,
      behavior: "ممتاز",
      lastActivity: "اليوم",
      nextLesson: "أسماء الله الحسنى",
      status: "حاضر",
    },
  ];

  const recentActivities = [
    {
      student: "أحمد محمد",
      activity: "أكمل حفظ سورة الفاتحة",
      time: "منذ ساعة",
    },
    {
      student: "فاطمة علي",
      activity: "شارك في نشاط الآداب الإسلامية",
      time: "منذ ساعتين",
    },
    {
      student: "عائشة أحمد",
      activity: "حصل على نجمة ذهبية في التلاوة",
      time: "منذ 3 ساعات",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">صفي الدراسي</h1>
            <p className="text-emerald-600 mt-2">إدارة ومتابعة الفصل الدراسي</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <MessageSquare className="w-4 h-4 ml-2" />
              إرسال رسالة جماعية
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 ml-2" />
              تقرير التقدم
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="البحث عن طالب..." className="pr-10" />
              </div>
              <Button variant="outline">تصفية</Button>
            </div>
          </CardContent>
        </Card>

        {/* Classroom Info */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">
                  {classroomInfo.name}
                </h3>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {classroomInfo.currentStudents}/{classroomInfo.capacity}{" "}
                      طالب
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{classroomInfo.location}</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        20
                      </div>
                      <div className="text-sm text-gray-600">الحاضرون</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        91%
                      </div>
                      <div className="text-sm text-gray-600">نسبة الحضور</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  طلاب الفصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <Badge
                              variant={
                                student.status === "حاضر"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {student.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            عرض
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            تقدم القرآن
                          </div>
                          <Progress
                            value={student.quranProgress}
                            className="h-2"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {student.quranProgress}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            الدراسات الإسلامية
                          </div>
                          <Progress
                            value={student.islamicStudies}
                            className="h-2"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {student.islamicStudies}%
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>الحضور: {student.attendance}%</span>
                        <span>السلوك: {student.behavior}</span>
                        <span>الدرس التالي: {student.nextLesson}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  الأنشطة الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {activity.student}
                        </div>
                        <div className="text-sm text-gray-600">
                          {activity.activity}
                        </div>
                        <div className="text-xs text-gray-400">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  جدول اليوم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-emerald-50 rounded">
                    <span className="font-medium">تلاوة القرآن</span>
                    <span className="text-sm">8:00 - 8:30</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="font-medium">الآداب الإسلامية</span>
                    <span className="text-sm">9:00 - 9:30</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                    <span className="font-medium">نشاط حركي</span>
                    <span className="text-sm">10:00 - 10:30</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                    <span className="font-medium">القصص النبوية</span>
                    <span className="text-sm">11:00 - 11:30</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 ml-2" />
                  منح نجمة ذهبية
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 ml-2" />
                  تسجيل ملاحظة
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 ml-2" />
                  تنبيه ولي الأمر
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassroom;
