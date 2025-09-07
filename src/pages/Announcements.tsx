import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Send,
  Bell,
  Calendar,
  Users,
  Pin,
  MessageSquare,
} from "lucide-react";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "رحلة إلى المتحف الإسلامي",
      content:
        "نعلن لأولياء الأمور الكرام عن رحلة علمية إلى المتحف الإسلامي يوم الخميس القادم. الرجاء إرسال الموافقة والرسوم المطلوبة.",
      author: "أميرة أحمد",
      date: "2024-01-15",
      time: "10:30",
      priority: "عالي",
      category: "رحلات",
      recipients: "جميع الصفوف",
      views: 45,
      responses: 38,
      isPinned: true,
    },
    {
      id: 2,
      title: "اجتماع أولياء الأمور",
      content:
        "يسرنا دعوتكم لحضور اجتماع أولياء الأمور الشهري لمناقشة تقدم الأطفال والخطط التعليمية للشهر القادم.",
      author: "فاطمة محمد",
      date: "2024-01-14",
      time: "14:15",
      priority: "متوسط",
      category: "اجتماعات",
      recipients: "أولياء الأمور",
      views: 67,
      responses: 42,
      isPinned: false,
    },
    {
      id: 3,
      title: "مسابقة حفظ القرآن الكريم",
      content:
        "بإذن الله سيقام حفل مسابقة حفظ القرآن الكريم السنوية. التسجيل مفتوح للجميع والجوائز قيمة ومفيدة.",
      author: "خديجة سالم",
      date: "2024-01-13",
      time: "09:20",
      priority: "عالي",
      category: "مسابقات",
      recipients: "جميع الطلاب",
      views: 89,
      responses: 56,
      isPinned: true,
    },
    {
      id: 4,
      title: "تعديل مواعيد الدوام",
      content:
        "نود إعلامكم بتعديل طفيف في مواعيد الدوام ابتداء من الأسبوع القادم لتحسين جودة التعليم.",
      author: "مدير الروضة",
      date: "2024-01-12",
      time: "16:45",
      priority: "عالي",
      category: "إدارية",
      recipients: "الجميع",
      views: 123,
      responses: 89,
      isPinned: false,
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "عالي":
        return (
          <Badge variant="destructive" className="font-arabic">
            {priority}
          </Badge>
        );
      case "متوسط":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 font-arabic">
            {priority}
          </Badge>
        );
      case "منخفض":
        return (
          <Badge variant="secondary" className="font-arabic">
            {priority}
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="font-arabic">
            {priority}
          </Badge>
        );
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      رحلات: "bg-blue-100 text-blue-700",
      اجتماعات: "bg-green-100 text-green-700",
      مسابقات: "bg-purple-100 text-purple-700",
      إدارية: "bg-orange-100 text-orange-700",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-3xl font-bold font-arabic">الإعلانات والأخبار</h1>
          <p className="text-muted-foreground font-arabic">
            إدارة الإعلانات والتواصل مع أولياء الأمور
          </p>
        </div>
        <Button className="font-arabic">
          <Plus className="w-4 h-4 ml-2" />
          إعلان جديد
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold text-primary">15</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              إعلانات نشطة
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-success" />
              <div className="text-2xl font-bold text-success">324</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              مشاهدة إجمالية
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-warning" />
              <div className="text-2xl font-bold text-warning">225</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">ردود</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Send className="w-5 h-5 text-muted-foreground" />
              <div className="text-2xl font-bold text-muted-foreground">8</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              هذا الأسبوع
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Compose */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic text-right">إعلان سريع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="عنوان الإعلان..."
              className="text-right font-arabic"
            />
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في الإعلانات..."
                className="pr-10 text-right font-arabic"
              />
            </div>
          </div>
          <Textarea
            placeholder="نص الإعلان..."
            className="min-h-[100px] text-right font-arabic"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="font-arabic">
                مرفقات
              </Button>
              <Button variant="outline" size="sm" className="font-arabic">
                جدولة
              </Button>
            </div>
            <Button className="font-arabic">
              <Send className="w-4 h-4 ml-2" />
              نشر الإعلان
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`hover:shadow-lg transition-shadow ${
              announcement.isPinned ? "border-primary/50 bg-primary/5" : ""
            }`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-center">
                  {announcement.isPinned && (
                    <Pin className="w-4 h-4 text-primary" />
                  )}
                  {getPriorityBadge(announcement.priority)}
                  <Badge
                    variant="outline"
                    className={`font-arabic ${getCategoryColor(
                      announcement.category
                    )}`}
                  >
                    {announcement.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <CardTitle className="font-arabic text-xl mb-2">
                    {announcement.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs font-arabic">
                          {announcement.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-arabic">{announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(announcement.date).toLocaleDateString(
                          "ar-SA"
                        )}{" "}
                        - {announcement.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-arabic leading-relaxed mb-4 text-right">
                {announcement.content}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-border/50">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-arabic">
                      {announcement.recipients}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    <span>{announcement.views} مشاهدة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{announcement.responses} رد</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="font-arabic">
                    عرض الردود
                  </Button>
                  <Button variant="outline" size="sm" className="font-arabic">
                    تعديل
                  </Button>
                  <Button variant="ghost" size="sm" className="font-arabic">
                    إعادة إرسال
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
