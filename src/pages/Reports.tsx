import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  Download,
  TrendingUp,
  BookOpen,
  Star,
  Award,
  Calendar,
  BarChart3,
} from "lucide-react";

const Reports = () => {
  const studentReports = [
    {
      id: 1,
      studentName: "أحمد محمد الأحمد",
      class: "الصف الأول",
      quranProgress: 85,
      arabicProgress: 78,
      behaviorRating: 90,
      attendanceRate: 95,
      lastUpdate: "2024-01-15",
      teacher: "أميرة أحمد",
      notes: "طالب متميز في حفظ القرآن، يحتاج تحسين في الكتابة",
    },
    {
      id: 2,
      studentName: "فاطمة علي السالم",
      class: "الصف الثاني",
      quranProgress: 92,
      arabicProgress: 88,
      behaviorRating: 95,
      attendanceRate: 92,
      lastUpdate: "2024-01-14",
      teacher: "فاطمة محمد",
      notes: "طالبة مجتهدة ومتعاونة، أداء ممتاز في جميع المواد",
    },
    {
      id: 3,
      studentName: "عبدالله سعد الخالد",
      class: "الصف الأول",
      quranProgress: 65,
      arabicProgress: 70,
      behaviorRating: 75,
      attendanceRate: 88,
      lastUpdate: "2024-01-13",
      teacher: "أميرة أحمد",
      notes: "يحتاج المزيد من التشجيع والمتابعة من المنزل",
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "text-success";
    if (progress >= 75) return "text-warning";
    return "text-destructive";
  };

  const getProgressBadge = (progress: number) => {
    if (progress >= 90)
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          ممتاز
        </Badge>
      );
    if (progress >= 75)
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20">
          جيد
        </Badge>
      );
    return <Badge variant="destructive">يحتاج تحسين</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-3xl font-bold font-arabic">
            التقارير والتقييمات
          </h1>
          <p className="text-muted-foreground font-arabic">
            متابعة تقدم الطلاب وتقييم الأداء
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-arabic">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقارير
          </Button>
          <Button className="font-arabic">
            <FileText className="w-4 h-4 ml-2" />
            تقرير جديد
          </Button>
        </div>
      </div>

      {/* Overall Performance Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold text-primary">78%</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              متوسط حفظ القرآن
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full w-[78%]"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-success" />
              <div className="text-2xl font-bold text-success">85%</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              متوسط اللغة العربية
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-success h-2 rounded-full w-[85%]"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-warning" />
              <div className="text-2xl font-bold text-warning">87%</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              متوسط السلوك
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-warning h-2 rounded-full w-[87%]"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <div className="text-2xl font-bold text-muted-foreground">
                92%
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              متوسط الحضور
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-muted-foreground h-2 rounded-full w-[92%]"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="individual" className="font-arabic">
            التقارير الفردية
          </TabsTrigger>
          <TabsTrigger value="class" className="font-arabic">
            تقارير الصفوف
          </TabsTrigger>
          <TabsTrigger value="analytics" className="font-arabic">
            الإحصائيات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          <div className="space-y-4">
            {studentReports.map((report) => (
              <Card
                key={report.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      {getProgressBadge(
                        Math.round(
                          (report.quranProgress +
                            report.arabicProgress +
                            report.behaviorRating) /
                            3
                        )
                      )}
                      <Badge variant="outline" className="font-arabic">
                        {report.class}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="font-arabic">
                            {report.studentName.split(" ")[0].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="font-arabic text-lg">
                            {report.studentName}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground font-arabic">
                            المعلمة: {report.teacher}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${getProgressColor(
                          report.quranProgress
                        )}`}
                      >
                        {report.quranProgress}%
                      </div>
                      <p className="text-sm text-muted-foreground font-arabic">
                        حفظ القرآن
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${report.quranProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${getProgressColor(
                          report.arabicProgress
                        )}`}
                      >
                        {report.arabicProgress}%
                      </div>
                      <p className="text-sm text-muted-foreground font-arabic">
                        اللغة العربية
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div
                          className="bg-success h-2 rounded-full transition-all"
                          style={{ width: `${report.arabicProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${getProgressColor(
                          report.behaviorRating
                        )}`}
                      >
                        {report.behaviorRating}%
                      </div>
                      <p className="text-sm text-muted-foreground font-arabic">
                        السلوك
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div
                          className="bg-warning h-2 rounded-full transition-all"
                          style={{ width: `${report.behaviorRating}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${getProgressColor(
                          report.attendanceRate
                        )}`}
                      >
                        {report.attendanceRate}%
                      </div>
                      <p className="text-sm text-muted-foreground font-arabic">
                        الحضور
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div
                          className="bg-muted-foreground h-2 rounded-full transition-all"
                          style={{ width: `${report.attendanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-arabic font-semibold mb-2 text-right">
                      ملاحظات المعلمة:
                    </h4>
                    <p className="font-arabic text-sm text-muted-foreground text-right leading-relaxed">
                      {report.notes}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        آخر تحديث:{" "}
                        {new Date(report.lastUpdate).toLocaleDateString(
                          "ar-SA"
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-arabic"
                      >
                        طباعة التقرير
                      </Button>
                      <Button variant="ghost" size="sm" className="font-arabic">
                        إرسال لولي الأمر
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="class" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                تقارير الصفوف
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-arabic">
                  سيتم عرض تقارير الصفوف هنا
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                الإحصائيات التفصيلية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-arabic">
                  سيتم عرض الإحصائيات التفصيلية هنا
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
