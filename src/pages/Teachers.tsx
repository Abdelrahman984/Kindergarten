import { useState } from "react";
import {
  useTeachers,
  useCreateTeacher,
  useUpdateTeacher,
  useDeleteTeacher,
  useTeacherStats,
  ApiTeacher,
} from "@/api/teachers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import TeacherForm from "@/components/teacher/TeacherForm";
import TeacherCard from "@/components/teacher/TeacherCard";
import StatsCards from "@/components/shared/StatsCards";
import { Users, CheckCircle, XCircle, BookOpen, Book } from "lucide-react";

const Teachers = () => {
  const { data: teachers, isLoading, isError } = useTeachers();
  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();
  const deleteTeacher = useDeleteTeacher();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<ApiTeacher | null>(null);
  const [search, setSearch] = useState("");

  // teacher stats
  const { data: teacherStats, isLoading: statsLoading } = useTeacherStats();

  const statCards =
    teacherStats?.total > 0
      ? [
          {
            label: "إجمالي المعلمين",
            value: teacherStats.total,
            icon: <Users className="w-5 h-5 text-sky-500" />,
          },
          {
            label: "المعلمين النشطين",
            value: teacherStats.active,
            icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            trend: `${Math.round(
              (teacherStats.active / Math.max(1, teacherStats.total)) * 100
            )}%`,
            isPositiveStat: true,
          },
          {
            label: "المعلمين غير النشطين",
            value: teacherStats.inactive,
            icon: <XCircle className="w-5 h-5 text-red-500" />,
            trend: `${Math.round(
              (teacherStats.inactive / Math.max(1, teacherStats.total)) * 100
            )}%`,
            isPositiveStat: false,
          },
          {
            label: "مع مواد",
            value: teacherStats.withSubjects,
            icon: <BookOpen className="w-5 h-5 text-green-500" />,
            trend: `${Math.round(
              (teacherStats.withSubjects / Math.max(1, teacherStats.total)) *
                100
            )}%`,
            isPositiveStat: true,
          },
          {
            label: "بدون مواد",
            value: teacherStats.withoutSubjects,
            icon: <Book className="w-5 h-5 text-red-500" />,
            trend: `${Math.round(
              (teacherStats.withoutSubjects / Math.max(1, teacherStats.total)) *
                100
            )}%`,
            isPositiveStat: false,
          },
        ]
      : [];

  const filteredTeachers =
    teachers?.filter(
      (t) =>
        t.fullName.toLowerCase().includes(search.toLowerCase()) ||
        t.subjectName.toLowerCase().includes(search.toLowerCase()) || // 👈 تعديل هنا
        (t.phoneNumber?.includes(search) ?? false)
    ) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold font-arabic">إدارة المعلمين</h2>
        <Button
          className="font-arabic"
          onClick={() => {
            setEditingTeacher(null);
            setFormOpen(true);
          }}
        >
          إضافة معلم
        </Button>
      </div>
      {/* إحصائيات المعلمين */}
      <div>
        {statsLoading ? (
          <div className="mb-4 text-sm text-muted-foreground">
            جاري تحميل الإحصائيات...
          </div>
        ) : (
          statCards.length > 0 && <StatsCards stats={statCards} columns={5} />
        )}
      </div>

      {/* �🔍 البحث + إضافة */}
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="ابحث بالاسم أو المادة أو الهاتف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-arabic bg-white"
        />
      </div>

      {/* 📦 الفورم (إضافة/تعديل) */}
      <TeacherForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={editingTeacher}
        onSubmit={(teacher) => {
          if ("id" in teacher) {
            updateTeacher.mutate(teacher, {
              onSuccess: () => toast.success("تم تحديث المعلم"),
            });
          } else {
            createTeacher.mutate(teacher, {
              onSuccess: () => toast.success("تمت إضافة المعلم"),
            });
          }
        }}
      />

      {/* 📋 قائمة المعلمين */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="col-span-full text-center">جاري التحميل...</div>
        )}
        {isError && (
          <div className="col-span-full text-center text-red-500">
            حدث خطأ أثناء جلب البيانات
          </div>
        )}
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onEdit={(t) => {
                setEditingTeacher(t);
                setFormOpen(true);
              }}
              onDelete={(id) => {
                if (confirm("هل أنت متأكد من حذف هذا المعلم؟")) {
                  deleteTeacher.mutate(id, {
                    onSuccess: () => toast.success("تم الحذف بنجاح"),
                  });
                }
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            لا يوجد نتائج
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
