import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from "@/components/DashboardStats";
import kindergartenHero from "@/assets/kindergarten-hero.jpg";
import {
  Calendar,
  MessageSquare,
  Clock,
  BookOpen,
  Heart,
  Star,
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [userRole] = useState<"admin" | "teacher" | "parent">("admin");

  return (
    <div className="space-y-6">
      {/* Welcome Hero Section */}
      <Card className="overflow-hidden bg-gradient-islamic text-primary-foreground shadow-islamic">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4 font-arabic">
                أهلاً وسهلاً بكم في روضة الأنصار
              </h1>
              <p className="text-lg mb-6 font-arabic opacity-90">
                نحن نؤمن بأن التعليم المبكر هو حجر الأساس لبناء جيل مؤمن ومتعلم.
                نجمع بين التعليم الحديث والقيم الإسلامية الأصيلة.
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" size="lg" className="font-arabic">
                  <BookOpen className="w-4 h-4 ml-2" />
                  إدارة الطلاب
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-arabic border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Calendar className="w-4 h-4 ml-2" />
                  الحضور اليومي
                </Button>
              </div>
            </div>
            <div className="relative h-80 md:h-auto">
              <img
                src={kindergartenHero}
                alt="روضة الأنصار - بيئة تعليمية إسلامية"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Stats */}
      <DashboardStats userRole={userRole} />

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1 hover:shadow-soft transition-smooth">
          <CardHeader>
            <CardTitle className="font-arabic text-right">
              الإجراءات السريعة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start font-arabic"
            >
              <Calendar className="w-4 h-4 ml-3" />
              تسجيل الحضور اليومي
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start font-arabic"
            >
              <MessageSquare className="w-4 h-4 ml-3" />
              إرسال إعلان جديد
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start font-arabic"
            >
              <BookOpen className="w-4 h-4 ml-3" />
              إضافة تقرير تقييم
            </Button>
            <Button variant="warm" className="w-full justify-start font-arabic">
              <Star className="w-4 h-4 ml-3" />
              عرض أداء الطلاب
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 hover:shadow-soft transition-smooth">
          <CardHeader>
            <CardTitle className="font-arabic text-right">
              النشاطات الحديثة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="p-2 bg-gradient-islamic rounded-full">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1 text-right">
                  <h4 className="font-semibold font-arabic">
                    حفظ سورة الفاتحة
                  </h4>
                  <p className="text-sm text-muted-foreground font-arabic">
                    أكمل 15 طالباً حفظ سورة الفاتحة بنجاح
                  </p>
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    منذ ساعتين
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                <div className="p-2 bg-gradient-sky rounded-full">
                  <Calendar className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div className="flex-1 text-right">
                  <h4 className="font-semibold font-arabic">معدل حضور ممتاز</h4>
                  <p className="text-sm text-muted-foreground font-arabic">
                    فصل KG2-أ حقق معدل حضور 98% هذا الأسبوع
                  </p>
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    منذ 4 ساعات
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange/50">
                <div className="p-2 bg-gradient-warm rounded-full">
                  <Heart className="w-4 h-4 text-orange-foreground" />
                </div>
                <div className="flex-1 text-right">
                  <h4 className="font-semibold font-arabic">نشاط تطوعي</h4>
                  <p className="text-sm text-muted-foreground font-arabic">
                    مشاركة الأطفال في توزيع الطعام على المحتاجين
                  </p>
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    أمس
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Islamic Values Section */}
      <Card className="bg-gradient-to-r from-accent/30 to-orange/30 border-0 shadow-soft">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 font-arabic text-foreground">
            قيمنا الإسلامية
          </h2>
          <p className="text-muted-foreground font-arabic mb-6 max-w-2xl mx-auto">
            نربي أطفالكم على القيم الإسلامية الأصيلة مع التعليم الحديث المتطور.
            نؤمن بأن الطفل أمانة في أعناقنا نرعاها بكل حب واهتمام.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-islamic rounded-full mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold font-arabic">حفظ القرآن</h3>
              <p className="text-sm text-muted-foreground font-arabic">
                تحفيظ القرآن الكريم بأساليب تربوية ممتعة
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-sky rounded-full mx-auto mb-3 flex items-center justify-center">
                <Heart className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold font-arabic">الأخلاق الحميدة</h3>
              <p className="text-sm text-muted-foreground font-arabic">
                غرس القيم والأخلاق الإسلامية النبيلة
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-3 flex items-center justify-center">
                <Star className="w-8 h-8 text-orange-foreground" />
              </div>
              <h3 className="font-semibold font-arabic">التميز الأكاديمي</h3>
              <p className="text-sm text-muted-foreground font-arabic">
                برامج تعليمية متطورة باللغة العربية
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
