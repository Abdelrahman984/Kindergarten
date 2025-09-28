import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MenuItem } from "@mui/material";
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
import { Card, TextField, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    <div className="space-y-6">
      {/* 🔍 فلاتر */}
      <Card className="px-6 py-4 shadow-md rounded-xl bg-white">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
          {/* مربع البحث */}
          <div className="flex-1">
            <TextField
              placeholder="ابحث بالاسم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search size={18} className="text-gray-400" />
                  </InputAdornment>
                ),
                style: { borderRadius: 8, background: "#fafbfc" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fafbfc",
                },
              }}
            />
          </div>

          {/* الفلتر بالصف (MUI TextField select) */}
          <div className="w-full md:w-56">
            <TextField
              select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              dir="rtl"
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fafbfc",
                },
              }}
            >
              <MenuItem value="all">كل الصفوف</MenuItem>
              {isLoading ? (
                <MenuItem value="loading" disabled>
                  جاري التحميل...
                </MenuItem>
              ) : (
                classrooms.map((cls) => (
                  <MenuItem key={cls.id} value={cls.name}>
                    {cls.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>

          {/* الفلتر بالتاريخ */}
          <div className="w-full md:w-56 flex items-center justify-center">
            <DatePicker
              value={selectedDate ? new Date(selectedDate) : null}
              onChange={(newVal) => {
                if (newVal instanceof Date && !isNaN(newVal.getTime())) {
                  const yyyy = newVal.getFullYear();
                  const mm = String(newVal.getMonth() + 1).padStart(2, "0");
                  const dd = String(newVal.getDate()).padStart(2, "0");
                  setSelectedDate(`${yyyy}-${mm}-${dd}`);
                } else {
                  setSelectedDate("");
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  margin: "none", // 👈 عشان يطابق الباقي
                  dir: "rtl",
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#fafbfc",
                      height: "40px", // 👈 خلي الارتفاع ثابت زي باقي الحقول
                    },
                    "& .MuiInputBase-input": {
                      padding: "8.5px 14px", // 👈 padding زي TextField الصغير
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="current" dir="rtl">
        <TabsList className="grid grid-cols-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200 mb-2">
          {/* الحالية */}
          <TabsTrigger
            value="current"
            className="data-[state=active]:bg-warning/20 data-[state=active]:text-warning-900 rounded-md px-4 py-2 transition font-semibold"
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
            className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive-900 rounded-md px-4 py-2 transition font-semibold"
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
            className="data-[state=active]:bg-success/20 data-[state=active]:text-success-900 rounded-md px-4 py-2 transition font-semibold"
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
