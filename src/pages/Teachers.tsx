import { useState } from "react";
import {
  useTeachers,
  useCreateTeacher,
  useUpdateTeacher,
  useDeleteTeacher,
  ApiTeacher,
} from "@/api/teachers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import TeacherForm from "@/components/teacher/TeacherForm";
import TeacherCard from "@/components/teacher/TeacherCard";

const Teachers = () => {
  const { data: teachers, isLoading, isError } = useTeachers();
  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();
  const deleteTeacher = useDeleteTeacher();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<ApiTeacher | null>(null);
  const [search, setSearch] = useState("");

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
      {/* 🔍 البحث + إضافة */}
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
