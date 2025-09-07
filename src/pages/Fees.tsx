import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DollarSign,
  Search,
  Download,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
} from "lucide-react";

const Fees = () => {
  const feeRecords = [
    {
      id: 1,
      studentName: "أحمد محمد الأحمد",
      class: "الصف الأول",
      amount: 1200,
      month: "يناير 2024",
      status: "مدفوع",
      dueDate: "2024-01-15",
      paidDate: "2024-01-10",
      parent: "محمد الأحمد",
    },
    {
      id: 2,
      studentName: "فاطمة علي السالم",
      class: "الصف الثاني",
      amount: 1200,
      month: "يناير 2024",
      status: "متأخر",
      dueDate: "2024-01-15",
      paidDate: null,
      parent: "علي السالم",
    },
    {
      id: 3,
      studentName: "عبدالله سعد الخالد",
      class: "الصف الأول",
      amount: 1200,
      month: "يناير 2024",
      status: "معلق",
      dueDate: "2024-01-15",
      paidDate: null,
      parent: "سعد الخالد",
    },
    {
      id: 4,
      studentName: "مريم حسن العلي",
      class: "الصف التمهيدي",
      amount: 1000,
      month: "يناير 2024",
      status: "مدفوع",
      dueDate: "2024-01-15",
      paidDate: "2024-01-12",
      parent: "حسن العلي",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مدفوع":
        return (
          <Badge className="bg-success/10 text-success border-success/20 font-arabic">
            {status}
          </Badge>
        );
      case "متأخر":
        return (
          <Badge variant="destructive" className="font-arabic">
            {status}
          </Badge>
        );
      case "معلق":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 font-arabic">
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
      case "مدفوع":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "متأخر":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "معلق":
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-3xl font-bold font-arabic">إدارة الرسوم</h1>
          <p className="text-muted-foreground font-arabic">
            متابعة رسوم الطلاب والمدفوعات
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-arabic">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button className="font-arabic">
            <Receipt className="w-4 h-4 ml-2" />
            إضافة دفعة
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold text-primary">102,000</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">
              إجمالي الرسوم
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div className="text-2xl font-bold text-success">89,500</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">المحصل</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <div className="text-2xl font-bold text-destructive">8,400</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">متأخر</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-warning" />
              <div className="text-2xl font-bold text-warning">4,100</div>
            </div>
            <p className="text-sm text-muted-foreground font-arabic">معلق</p>
          </CardContent>
        </Card>
      </div>

      {/* Fee Management Tabs */}
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current" className="font-arabic">
            الشهر الحالي
          </TabsTrigger>
          <TabsTrigger value="overdue" className="font-arabic">
            متأخرة
          </TabsTrigger>
          <TabsTrigger value="history" className="font-arabic">
            السجل
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-arabic text-right">
                  رسوم يناير 2024
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
                {feeRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex gap-3">
                      {getStatusIcon(record.status)}
                      {getStatusBadge(record.status)}
                    </div>

                    <div className="flex-1 grid grid-cols-5 gap-4 text-right">
                      <div>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs font-arabic">
                              {record.studentName.split(" ")[0].charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium font-arabic">
                              {record.studentName}
                            </p>
                            <p className="text-xs text-muted-foreground font-arabic">
                              {record.parent}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-arabic text-sm">{record.class}</p>
                      </div>

                      <div>
                        <p className="font-bold">
                          {record.amount.toLocaleString()} ريال
                        </p>
                        <p className="text-xs text-muted-foreground font-arabic">
                          {record.month}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm">
                          {record.paidDate
                            ? new Date(record.paidDate).toLocaleDateString(
                                "ar-SA"
                              )
                            : new Date(record.dueDate).toLocaleDateString(
                                "ar-SA"
                              )}
                        </p>
                        <p className="text-xs text-muted-foreground font-arabic">
                          {record.paidDate ? "تاريخ الدفع" : "تاريخ الاستحقاق"}
                        </p>
                      </div>

                      <div className="flex gap-1">
                        {record.status !== "مدفوع" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="h-8 px-2 font-arabic"
                          >
                            <CreditCard className="w-3 h-3 ml-1" />
                            دفع
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 font-arabic"
                        >
                          عرض
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                الرسوم المتأخرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {feeRecords
                  .filter((record) => record.status === "متأخر")
                  .map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center gap-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <div className="flex-1 text-right">
                        <p className="font-medium font-arabic">
                          {record.studentName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          متأخر منذ{" "}
                          {Math.ceil(
                            (Date.now() - new Date(record.dueDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          يوم
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {record.amount.toLocaleString()} ريال
                        </p>
                      </div>
                      <Button size="sm" className="font-arabic">
                        إرسال تذكير
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic text-right">
                سجل المدفوعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-arabic">
                  سيتم عرض سجل المدفوعات هنا
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fees;
