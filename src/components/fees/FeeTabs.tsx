import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FeeTable } from "./FeeRow";
import { FeeRecord } from "@/api/fees";
import { useClassrooms } from "@/api/classrooms";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AlertCircle, CheckCircle, Clock, Search } from "lucide-react";
import { Card } from "@mui/material";

interface FeesTabsProps {
  feeRecords: FeeRecord[];
  onPay: (id: string | number) => void;
  onMarkAsPaid: (id: string | number) => void;
}

export default function FeesTabs({
  feeRecords,
  onPay,
  onMarkAsPaid,
}: FeesTabsProps) {
  const { data: classrooms = [], isLoading } = useClassrooms();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 فلترة البيانات
  const filtered = feeRecords.filter((f) => {
    const byClass = selectedClass === "all" || f.className === selectedClass;
    const byDate = !selectedDate || f.dueDate.startsWith(selectedDate);

    // ابحث في الاسم (ولي الأمر أو الطالب)
    const bySearch =
      !searchQuery ||
      f.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.parentName?.toLowerCase().includes(searchQuery.toLowerCase());

    return byClass && byDate && bySearch;
  });

  return (
    <div className="space-y-4">
      {/* 🔍 فلاتر */}
      <Card className="p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* مربع البحث */}
          <div className="relative md:col-span-6">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="ابحث بالاسم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-10 w-full"
            />
          </div>

          {/* الفلتر بالصف */}
          <div className="md:col-span-3">
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
              dir="rtl"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الصف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الصفوف</SelectItem>
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    جاري التحميل...
                  </SelectItem>
                ) : (
                  classrooms.map((cls) => (
                    <SelectItem key={cls.id} value={cls.name}>
                      {cls.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* الفلتر بالتاريخ */}
          <div className="md:col-span-3">
            <Input
              dir="rtl"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-right w-full"
            />
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="current" dir="rtl">
        <TabsList className="grid grid-cols-3 bg-muted rounded-lg">
          {/* الحالية */}
          <TabsTrigger
            value="current"
            className="data-[state=active]:bg-warning/10 rounded-md px-4 py-2 transition"
          >
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center items-center gap-1 text-warning w-full h-full">
                    <Clock size={16} />
                    الحالية
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  الرسوم المستحقة الآن ولم يحن موعد استحقاقها بعد
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsTrigger>

          {/* المتأخرة */}
          <TabsTrigger
            value="overdue"
            className="data-[state=active]:bg-destructive/10 rounded-md px-4 py-2 transition"
          >
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center items-center gap-1 text-destructive w-full h-full">
                    <AlertCircle size={16} />
                    المتأخرة
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  الرسوم التي تجاوزت تاريخ استحقاقها ولم يتم دفعها بعد
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsTrigger>

          {/* المدفوعة */}
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-success/10 rounded-md px-4 py-2 transition"
          >
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center items-center gap-1 text-success w-full h-full ">
                    <CheckCircle size={16} />
                    المدفوعة
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  الرسوم التي تم دفعها
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <FeeTable
            records={filtered.filter((f) => f.status === "Pending")}
            onPay={onPay}
            onMarkAsPaid={onMarkAsPaid}
          />
        </TabsContent>
        <TabsContent value="overdue">
          <FeeTable
            records={filtered.filter((f) => f.status === "Overdue")}
            onPay={onPay}
            onMarkAsPaid={onMarkAsPaid}
          />
        </TabsContent>
        <TabsContent value="history">
          <FeeTable
            records={filtered.filter((f) => f.status === "Paid")}
            onPay={onPay}
            onMarkAsPaid={onMarkAsPaid}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
