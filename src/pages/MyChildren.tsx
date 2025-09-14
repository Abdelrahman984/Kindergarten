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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Star,
  Calendar,
  CheckCircle,
  Heart,
  MessageSquare,
  FileText,
  Award,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";

const MyChildren = () => {
  const children = [
    {
      id: 1,
      name: "سارة أحمد",
      avatar: "/placeholder.svg",
      class: "الروضة الأولى",
      teacher: "المعلمة فاطمة",
      attendance: 95,
      quranProgress: 75,
      islamicStudies: 88,
      behavior: "ممتاز",
      lastActivity: "حفظ سورة الإخلاص",
      nextLesson: "آداب النظافة",
      status: "حاضر",
      recentAchievements: ["نجمة ذهبية في التلاوة", "مشاركة ممتازة في النشاط"],
    },
    {
      id: 2,
      name: "محمد أحمد",
      avatar: "/placeholder.svg",
      class: "الروضة الثانية",
      teacher: "الأستاذ عبدالله",
      attendance: 92,
      quranProgress: 82,
      islamicStudies: 90,
      behavior: "جيد جداً",
      lastActivity: "تعلم دعاء الطعام",
      nextLesson: "سورة الفاتحة",
      status: "حاضر",
      recentAchievements: ["حفظ 5 أدعية جديدة", "سلوك ممتاز هذا الأسبوع"],
    },
  ];

  const upcomingEvents = [
    { event: "مسابقة حفظ القرآن", date: "2024-01-15", time: "10:00 ص" },
    { event: "نشاط الحرف اليدوية", date: "2024-01-18", time: "2:00 م" },
    { event: "حفل تكريم المتفوقين", date: "2024-01-20", time: "11:00 ص" },
  ];

  const recentMessages = [
    {
      from: "المعلمة فاطمة",
      message: "سارة أحرزت تقدماً ممتازاً في حفظ القرآن",
      time: "منذ ساعة",
    },
    {
      from: "الأستاذ عبدالله",
      message: "محمد شارك بفعالية في درس آداب الطعام",
      time: "منذ 3 ساعات",
    },
    {
      from: "الإدارة",
      message: "تذكير بموعد اجتماع أولياء الأمور",
      time: "أمس",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-6"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-rose-800">أطفالي</h1>
            <p className="text-rose-600 mt-2">
              متابعة تقدم أطفالك في الروضة الإسلامية
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-rose-600 hover:bg-rose-700">
              <MessageSquare className="w-4 h-4 ml-2" />
              تواصل مع المعلم
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 ml-2" />
              التقارير
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-rose-600">
                {children.length}
              </div>
              <div className="text-sm text-gray-600">أطفالي في الروضة</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">متوسط الحضور</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">79%</div>
              <div className="text-sm text-gray-600">متوسط التقدم</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">الإنجازات هذا الشهر</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Children Progress */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="progress" className="space-y-4">
              <TabsList>
                <TabsTrigger value="progress">التقدم الأكاديمي</TabsTrigger>
                <TabsTrigger value="activities">الأنشطة</TabsTrigger>
                <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
              </TabsList>

              <TabsContent value="progress">
                <div className="space-y-6">
                  {children.map((child) => (
                    <Card key={child.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={child.avatar} />
                              <AvatarFallback>
                                {child.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-lg">
                                {child.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {child.class} - {child.teacher}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              child.status === "حاضر"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {child.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-emerald-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                تقدم القرآن
                              </span>
                              <BookOpen className="w-4 h-4 text-emerald-600" />
                            </div>
                            <Progress
                              value={child.quranProgress}
                              className="h-2 mb-2"
                            />
                            <span className="text-xs text-emerald-600">
                              {child.quranProgress}%
                            </span>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                الدراسات الإسلامية
                              </span>
                              <Star className="w-4 h-4 text-blue-600" />
                            </div>
                            <Progress
                              value={child.islamicStudies}
                              className="h-2 mb-2"
                            />
                            <span className="text-xs text-blue-600">
                              {child.islamicStudies}%
                            </span>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                الحضور
                              </span>
                              <Clock className="w-4 h-4 text-purple-600" />
                            </div>
                            <Progress
                              value={child.attendance}
                              className="h-2 mb-2"
                            />
                            <span className="text-xs text-purple-600">
                              {child.attendance}%
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            آخر نشاط: {child.lastActivity}
                          </span>
                          <span className="text-gray-600">
                            الدرس التالي: {child.nextLesson}
                          </span>
                          <Badge variant="outline">{child.behavior}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activities">
                <Card>
                  <CardHeader>
                    <CardTitle>الأنشطة الأخيرة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="border-l-4 border-rose-200 pl-4"
                        >
                          <h4 className="font-semibold">{child.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {child.lastActivity}
                          </p>
                          <div className="flex gap-2">
                            {child.recentAchievements.map(
                              (achievement, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {achievement}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      الإنجازات والجوائز
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg"
                        >
                          <h4 className="font-semibold mb-2">{child.name}</h4>
                          <div className="space-y-2">
                            {child.recentAchievements.map(
                              (achievement, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm">{achievement}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  الرسائل الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMessages.map((message, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm">{message.from}</div>
                      <div className="text-sm text-gray-600 mb-1">
                        {message.message}
                      </div>
                      <div className="text-xs text-gray-400">
                        {message.time}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3">
                  عرض جميع الرسائل
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  الأحداث القادمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-sm">{event.event}</div>
                      <div className="text-sm text-gray-600">{event.date}</div>
                      <div className="text-xs text-gray-500">{event.time}</div>
                    </div>
                  ))}
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
                  <MessageSquare className="w-4 h-4 ml-2" />
                  إرسال رسالة للمعلم
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 ml-2" />
                  طلب موعد
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 ml-2" />
                  طلب تقرير مفصل
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 ml-2" />
                  إرسال شكر للمعلم
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChildren;
