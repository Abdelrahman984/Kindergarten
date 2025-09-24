import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, FileText, AlertCircle } from "lucide-react";

const QuickActions = () => (
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
);

export default QuickActions;
