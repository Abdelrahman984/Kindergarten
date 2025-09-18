// AttendanceTable.tsx
import { Badge } from "@/components/ui/badge";
import { AttendanceReadDto } from "@/api/attendances";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface AttendanceTableProps {
  data: AttendanceReadDto[];
}

const getStatusBadge = (status: 0 | 1 | 2 | 3) => {
  switch (status) {
    case 0:
      return (
        <Badge variant="secondary" className="cursor-default font-arabic">
          غير محدد
        </Badge>
      );
    case 1:
      return <Badge className="cursor-default font-arabic">حاضر</Badge>;
    case 2:
      return (
        <Badge variant="destructive" className="cursor-default font-arabic">
          غائب
        </Badge>
      );
    case 3:
      return (
        <Badge variant="warning" className="cursor-default font-arabic">
          متأخر
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="cursor-default font-arabic">
          غير معروف
        </Badge>
      );
  }
};

const getStatusIcon = (status: 0 | 1 | 2 | 3) => {
  switch (status) {
    case 0:
      return <Clock className="w-5 h-5 text-muted-foreground" />;
    case 1:
      return <CheckCircle className="w-5 h-5 text-success" />;
    case 2:
      return <XCircle className="w-5 h-5 text-destructive" />;
    case 3:
      return <Clock className="w-5 h-5 text-warning" />;
    default:
      return <Clock className="w-5 h-5 text-muted-foreground" />;
  }
};

const AttendanceTable = ({ data }: AttendanceTableProps) => {
  return (
    <div>
      {/* Table Headers */}
      <div className="grid grid-cols-12 gap-4 font-bold text-base text-primary px-4 py-2 bg-muted rounded-lg text-center">
        <div className="col-span-3 font-arabic">اسم الطالب</div>
        <div className="col-span-2 font-arabic">الفصل</div>
        <div className="col-span-2 font-arabic">وقت الحضور</div>
        <div className="col-span-3 font-arabic">ملاحظات</div>
        <div className="col-span-2 font-arabic">الحالة</div>
      </div>

      {data.map((student) => (
        <div
          key={student.id}
          className="grid grid-cols-12 gap-4 items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-center"
        >
          {/* اسم الطالب */}
          <div className="col-span-3">
            <p className="font-medium font-arabic">{student.studentName}</p>
          </div>
          {/* الفصل */}
          <div className="col-span-2">
            <p className="font-arabic text-sm">{student.classroomName}</p>
          </div>
          {/* وقت الحضور */}
          <div className="col-span-2">
            <p className="text-sm" dir="ltr">
              {student.arrivalTime
                ? `${new Date(
                    `1970-01-01T${student.arrivalTime}`
                  ).toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "—"}
            </p>
          </div>
          {/* الملاحظات */}
          <div className="col-span-3">
            <p className="font-arabic text-sm text-muted-foreground">
              {student.notes || "—"}
            </p>
          </div>
          {/* الحالة */}
          <div className="col-span-2 flex gap-2 items-center justify-center">
            {getStatusBadge(student.status)}
            {getStatusIcon(student.status)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceTable;
