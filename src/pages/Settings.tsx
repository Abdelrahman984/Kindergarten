import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-3xl font-bold font-arabic">الإعدادات</h1>
          <p className="text-muted-foreground font-arabic">
            إعدادات النظام والتخصيص
          </p>
        </div>
        <Button className="font-arabic">
          <Save className="w-4 h-4 ml-2" />
          حفظ التغييرات
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="font-arabic">
            الملف الشخصي
          </TabsTrigger>
          <TabsTrigger value="notifications" className="font-arabic">
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="security" className="font-arabic">
            الأمان
          </TabsTrigger>
          <TabsTrigger value="appearance" className="font-arabic">
            المظهر
          </TabsTrigger>
          <TabsTrigger value="system" className="font-arabic">
            النظام
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right flex items-center gap-2">
                <User className="w-5 h-5" />
                بيانات الملف الشخصي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="font-arabic text-right block"
                  >
                    الاسم الكامل
                  </Label>
                  <Input
                    id="fullName"
                    defaultValue="أميرة أحمد محمد"
                    className="text-right font-arabic"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-arabic text-right block"
                  >
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    defaultValue="amira@kindergarten.com"
                    className="text-right"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="font-arabic text-right block"
                  >
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="966501234567"
                    className="text-right"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="position"
                    className="font-arabic text-right block"
                  >
                    المنصب
                  </Label>
                  <Input
                    id="position"
                    defaultValue="معلمة الصف الأول"
                    className="text-right font-arabic"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-arabic text-right block">
                  نبذة تعريفية
                </Label>
                <Textarea
                  id="bio"
                  defaultValue="معلمة متخصصة في التربية الإسلامية والتحفيظ مع خبرة 5 سنوات في تعليم الأطفال"
                  className="text-right font-arabic min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Switch id="emailNotifications" defaultChecked />
                <div className="text-right">
                  <Label
                    htmlFor="emailNotifications"
                    className="font-arabic font-medium"
                  >
                    إشعارات البريد الإلكتروني
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    تلقي إشعارات عبر البريد الإلكتروني
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Switch id="smsNotifications" />
                <div className="text-right">
                  <Label
                    htmlFor="smsNotifications"
                    className="font-arabic font-medium"
                  >
                    إشعارات الرسائل النصية
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    تلقي إشعارات عبر الرسائل النصية
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Switch id="attendanceAlerts" defaultChecked />
                <div className="text-right">
                  <Label
                    htmlFor="attendanceAlerts"
                    className="font-arabic font-medium"
                  >
                    تنبيهات الحضور
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    إشعارات عند غياب الطلاب
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Switch id="announcements" defaultChecked />
                <div className="text-right">
                  <Label
                    htmlFor="announcements"
                    className="font-arabic font-medium"
                  >
                    الإعلانات الجديدة
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    إشعارات عند نشر إعلانات جديدة
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Switch id="weeklyReports" />
                <div className="text-right">
                  <Label
                    htmlFor="weeklyReports"
                    className="font-arabic font-medium"
                  >
                    التقارير الأسبوعية
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    تلقي تقارير أسبوعية تلقائية
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right flex items-center gap-2">
                <Shield className="w-5 h-5" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="font-arabic text-right block"
                >
                  كلمة المرور الحالية
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="newPassword"
                  className="font-arabic text-right block"
                >
                  كلمة المرور الجديدة
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="font-arabic text-right block"
                >
                  تأكيد كلمة المرور
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="text-right"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Switch id="twoFactor" />
                <div className="text-right">
                  <Label
                    htmlFor="twoFactor"
                    className="font-arabic font-medium"
                  >
                    المصادقة الثنائية
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    تفعيل الأمان الإضافي للحساب
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full font-arabic">
                تغيير كلمة المرور
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right flex items-center gap-2">
                <Palette className="w-5 h-5" />
                إعدادات المظهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Switch id="darkMode" />
                <div className="text-right">
                  <Label htmlFor="darkMode" className="font-arabic font-medium">
                    الوضع الليلي
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    استخدام السمة الداكنة
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-arabic text-right block">حجم الخط</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="font-arabic">
                    صغير
                  </Button>
                  <Button variant="default" size="sm" className="font-arabic">
                    متوسط
                  </Button>
                  <Button variant="outline" size="sm" className="font-arabic">
                    كبير
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-arabic text-right block">
                  اللون الأساسي
                </Label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-primary"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-transparent hover:border-primary cursor-pointer"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-transparent hover:border-primary cursor-pointer"></div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-transparent hover:border-primary cursor-pointer"></div>
                  <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-transparent hover:border-primary cursor-pointer"></div>
                  <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-transparent hover:border-primary cursor-pointer"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Switch id="animations" defaultChecked />
                <div className="text-right">
                  <Label
                    htmlFor="animations"
                    className="font-arabic font-medium"
                  >
                    الحركات والانتقالات
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    تفعيل الرسوم المتحركة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right flex items-center gap-2">
                <Database className="w-5 h-5" />
                إعدادات النظام
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="font-arabic text-right block">
                  نسخ احتياطي للبيانات
                </Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="font-arabic">
                    إنشاء نسخة احتياطية
                  </Button>
                  <Button variant="outline" className="font-arabic">
                    استعادة البيانات
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Switch id="autoBackup" defaultChecked />
                <div className="text-right">
                  <Label
                    htmlFor="autoBackup"
                    className="font-arabic font-medium"
                  >
                    النسخ الاحتياطي التلقائي
                  </Label>
                  <p className="text-sm text-muted-foreground font-arabic">
                    إنشاء نسخة احتياطية يومياً
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-arabic text-right block">
                  إدارة التخزين
                </Label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>2.3 GB</span>
                    <span className="font-arabic">المساحة المستخدمة</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>5 GB</span>
                    <span className="font-arabic">إجمالي المساحة</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-arabic text-right block">
                  تنظيف البيانات
                </Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-arabic">
                    مسح الملفات المؤقتة
                  </Button>
                  <Button variant="outline" size="sm" className="font-arabic">
                    تنظيف السجلات القديمة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
