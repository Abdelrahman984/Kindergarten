import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  GraduationCap,
  Award,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useSubjects,
  useAddSubject,
  useUpdateSubject,
  useDeleteSubject,
} from "@/api/subjects";
import { ApiTeacher, useTeachers, useUpdateTeacher } from "@/api/teachers";
import Select from "react-select";

const Subjects = () => {
  const { data: subjects, isLoading } = useSubjects();
  const addSubject = useAddSubject();
  const updateSubject = useUpdateSubject();
  const deleteSubject = useDeleteSubject();

  const { data: teachers } = useTeachers();
  const updateTeacher = useUpdateTeacher();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ id: "", name: "" });
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<string[]>([]);

  const handleSave = () => {
    if (editMode) {
      // تعديل مادة موجودة
      updateSubject.mutate(
        { id: form.id, name: form.name },
        {
          onSuccess: () => {
            // ربط المعلمين بالمادة بعد التعديل
            selectedTeacherIds.forEach((teacherId) => {
              const teacherToUpdate = teachers?.find((t) => t.id === teacherId);
              if (teacherToUpdate) {
                updateTeacher.mutate({
                  ...teacherToUpdate,
                  subjectId: form.id,
                  classroomIds: [],
                });
              }
            });
            setOpen(false);
          },
        }
      );
    } else {
      // إضافة مادة جديدة
      addSubject.mutate(
        { name: form.name },
        {
          onSuccess: (newSubject: { id: string }) => {
            selectedTeacherIds.forEach((teacherId) => {
              const teacherToUpdate = teachers?.find(
                (t: ApiTeacher) => t.id === teacherId
              );
              if (teacherToUpdate) {
                updateTeacher.mutate({
                  ...teacherToUpdate,
                  subjectId: newSubject.id,
                  classroomIds: [],
                });
              }
            });
            setOpen(false);
          },
        }
      );
    }
  };

  if (isLoading) return <p>جاري التحميل...</p>;

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-arabic">
              المواد الدراسية
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة المناهج والمواد التعليمية
            </p>
          </div>
          <Button
            className="font-arabic"
            onClick={() => {
              setForm({ id: "", name: "" });
              setSelectedTeacherIds([]);
              setEditMode(false);
              setOpen(true);
            }}
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة مادة جديدة
          </Button>
        </div>

        {/* Subjects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects?.map((subject) => {
            const subjectTeachers = teachers?.filter(
              (t) => t.subjectId === subject.id
            );

            return (
              <Card
                key={subject.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="font-arabic text-lg">
                          {subject.name}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setForm({ id: subject.id, name: subject.name });
                          setSelectedTeacherIds(
                            subjectTeachers?.map((t) => t.id) || []
                          );
                          setEditMode(true);
                          setOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSubject.mutate(subject.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Teachers */}
                  <div className="flex items-center gap-3">
                    {/* Teacher Icon */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium font-arabic">
                        {subjectTeachers?.map((t) => t.fullName).join(" - ") ||
                          "(لم يتم تحديد المعلم)"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        معلم المادة
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-arabic">تقدم المنهج</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 font-arabic"
                    >
                      <GraduationCap className="w-4 h-4 ml-2" />
                      عرض الطلاب
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 font-arabic"
                    >
                      <Award className="w-4 h-4 ml-2" />
                      التقييمات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-arabic">
              {editMode ? "تعديل مادة" : "إضافة مادة جديدة"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="font-arabic mb-1 block">اسم المادة</label>
            <Input
              placeholder="اسم المادة"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="font-arabic text-right bg-white border-gray-300 w-full"
            />
            <div>
              <label className="font-arabic mb-1 block">اختر المعلمين</label>
              <Select
                isMulti
                options={
                  teachers?.map((t) => ({
                    value: t.id,
                    label: t.fullName,
                  })) || []
                }
                value={
                  teachers
                    ?.filter((t) => selectedTeacherIds.includes(t.id))
                    .map((t) => ({
                      value: t.id,
                      label: t.fullName,
                    })) || []
                }
                onChange={(selected) => {
                  setSelectedTeacherIds(
                    (selected as { value: string; label: string }[]).map(
                      (opt) => opt.value
                    )
                  );
                }}
                className="w-full rounded-lg"
                classNamePrefix="react-select"
                placeholder="اختر المعلمين"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="font-arabic">
              {editMode ? "حفظ التغييرات" : "إضافة"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Subjects;
