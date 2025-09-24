import { Button } from "@/components/ui/button";
import { MessageSquare, FileText } from "lucide-react";

interface ClassroomHeaderProps {
  onSendMessage: () => void;
  onShowReport: () => void;
}

const ClassroomHeader = ({
  onSendMessage,
  onShowReport,
}: ClassroomHeaderProps) => (
  <div className="flex justify-between items-center flex-wrap gap-4">
    <div>
      <h1 className="text-3xl font-bold text-emerald-800">صفي الدراسي</h1>
      <p className="text-emerald-600 mt-2">إدارة ومتابعة الفصل الدراسي</p>
    </div>
    <div className="flex gap-3">
      <Button
        className="bg-emerald-600 hover:bg-emerald-700"
        onClick={onSendMessage}
      >
        <MessageSquare className="w-4 h-4 ml-2" />
        إرسال رسالة جماعية
      </Button>
      <Button variant="outline" onClick={onShowReport}>
        <FileText className="w-4 h-4 ml-2" />
        تقرير التقدم
      </Button>
    </div>
  </div>
);

export default ClassroomHeader;
