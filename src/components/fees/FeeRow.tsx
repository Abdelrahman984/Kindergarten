import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FeeRecord } from "@/api/fees";

interface FeeTableProps {
  records: FeeRecord[];
  onPay: (id: string | number) => void;
  onMarkAsPaid: (id: string | number) => void;
}

export function FeeTable({ records, onPay, onMarkAsPaid }: FeeTableProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground font-arabic">
        لا توجد بيانات
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border shadow-md">
      <Table className="min-w-full text-center font-arabic">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="text-center">اسم الطالب</TableHead>
            <TableHead className="text-center">الصف</TableHead>
            <TableHead className="text-center">المبلغ</TableHead>
            <TableHead className="text-center">تاريخ الاستحقاق</TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="text-center">{r.studentName}</TableCell>
              <TableCell className="text-center">{r.className}</TableCell>
              <TableCell className="text-center">{r.amount} ج.م</TableCell>
              <TableCell className="text-center">
                {new Date(r.dueDate).toLocaleDateString("ar-EG")}
              </TableCell>
              <TableCell className="text-center">
                {r.status === "Pending" && (
                  <span className="text-yellow-600">مستحقة</span>
                )}
                {r.status === "Overdue" && (
                  <span className="text-red-600">متأخرة</span>
                )}
                {r.status === "Paid" && (
                  <span className="text-green-600">مدفوعة</span>
                )}
              </TableCell>
              <TableCell className="flex gap-2 justify-center">
                {r.status !== "Paid" ? (
                  <Button size="sm" onClick={() => onMarkAsPaid(r.id)}>
                    تعليم كمدفوع
                  </Button>
                ) : (
                  <span className="text-muted-foreground">تم الدفع</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
