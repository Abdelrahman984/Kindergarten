import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

const Teachers = () => {
  const teachers = [
    {
      id: 1,
      name: "أميرة أحمد",
      email: "amira@kindergarten.com",
      phone: "966501234567",
      class: "الصف الأول",
      experience: "5 سنوات",
      specialization: "تربية إسلامية",
      status: "نشط",
    },
    {
      id: 2,
      name: "فاطمة محمد",
      email: "fatima@kindergarten.com",
      phone: "966507654321",
      class: "الصف الثاني",
      experience: "3 سنوات",
      specialization: "لغة عربية",
      status: "نشط",
    },
    {
      id: 3,
      name: "خديجة سالم",
      email: "khadija@kindergarten.com",
      phone: "966509876543",
      class: "الصف التمهيدي",
      experience: "7 سنوات",
      specialization: "تحفيظ قرآن",
      status: "إجازة",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-3xl font-bold font-arabic">إدارة المعلمين</h1>
          <p className="text-muted-foreground font-arabic">
            إدارة بيانات المعلمين والمعلمات
          </p>
        </div>
        <Button className="font-arabic">
          <Plus className="w-4 h-4 ml-2" />
          إضافة معلم جديد
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث عن معلم..."
                className="pr-10 text-right font-arabic"
              />
            </div>
            <Button variant="outline" className="font-arabic">
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-lg font-arabic bg-gradient-islamic text-primary-foreground">
                  {teacher.name.split(" ")[0].charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="font-arabic text-right">
                {teacher.name}
              </CardTitle>
              <Badge
                variant={teacher.status === "نشط" ? "default" : "secondary"}
                className="font-arabic"
              >
                {teacher.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-right">
                <div className="flex-1 text-right">
                  <p className="font-arabic text-sm">{teacher.class}</p>
                </div>
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="flex-1 text-right">
                  <p className="text-sm">{teacher.email}</p>
                </div>
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="flex-1 text-right">
                  <p className="text-sm" dir="ltr">
                    {teacher.phone}
                  </p>
                </div>
                <Phone className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="flex-1 text-right">
                  <p className="font-arabic text-sm">
                    {teacher.specialization}
                  </p>
                </div>
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="flex-1 text-right">
                  <p className="font-arabic text-sm">{teacher.experience}</p>
                </div>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 font-arabic"
                >
                  تعديل
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 font-arabic"
                >
                  عرض
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground font-arabic">
              إجمالي المعلمين
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-success">10</div>
            <p className="text-sm text-muted-foreground font-arabic">نشط</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning">2</div>
            <p className="text-sm text-muted-foreground font-arabic">
              في إجازة
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-muted-foreground">5.2</div>
            <p className="text-sm text-muted-foreground font-arabic">
              متوسط الخبرة
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Teachers;
