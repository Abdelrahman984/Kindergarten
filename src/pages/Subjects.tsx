import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useSubjects,
  useAddSubject,
  useUpdateSubject,
  useDeleteSubject,
  useUpdateSubjectTeachers,
  Subject,
  TeacherAssignment,
} from "@/api/subjects";
import { useTeachers } from "@/api/teachers";
import SubjectCard from "@/components/subject/SubjectCard";
import SubjectDialog from "@/components/subject/SubjectDialog";
import DeleteSubjectDialog from "@/components/subject/DeleteSubjectDialog";
import api from "@/api/client";

interface SubjectForm {
  id: string;
  name: string;
}

const Subjects = () => {
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: teachers } = useTeachers();

  const addSubject = useAddSubject();
  const updateSubject = useUpdateSubject();
  const deleteSubject = useDeleteSubject();
  const updateSubjectTeachers = useUpdateSubjectTeachers();

  const [dialogState, setDialogState] = useState<{
    type: "edit" | "delete" | null;
    form?: SubjectForm;
    selectedTeacherIds?: string[];
    subjectIdToDelete?: string | null;
  }>({ type: null });

  const handleOpenAdd = () => {
    setDialogState({
      type: "edit",
      form: { id: "", name: "" },
      selectedTeacherIds: [],
    });
  };

  const handleOpenEdit = (subject: Subject) => {
    const subjectTeacherIds =
      teachers?.filter((t) => t.subjectId === subject.id).map((t) => t.id) ||
      [];
    setDialogState({
      type: "edit",
      form: { id: subject.id, name: subject.name },
      selectedTeacherIds: subjectTeacherIds,
    });
  };

  const handleSave = async () => {
    if (!dialogState.form) return;

    const { id, name } = dialogState.form;
    const teacherIds = dialogState.selectedTeacherIds || [];

    try {
      let subjectId = id;

      if (id) {
        // Update existing subject
        await updateSubject.mutateAsync({ id, name });
      } else {
        // Add new subject
        const newSubject: Subject = await addSubject.mutateAsync({ name });
        subjectId = newSubject.id;
      }

      // 🟢 هنا التحقق قبل ربط المعلمين
      for (const teacherId of teacherIds) {
        const assignment = await api.get<TeacherAssignment>(
          `/teachers/${teacherId}/assigned-subject`
        );

        if (assignment.data.assigned && assignment.data.subjectName) {
          const confirmReplace = window.confirm(
            `المعلم مرتبط بالفعل بالمادة (${assignment.data.subjectName}). هل تريد استبداله وربطه بالمادة الجديدة؟`
          );

          if (!confirmReplace) {
            // هنا ممكن تضيف toast بدلاً من مجرد return
            return;
          }
        }
      }

      // Update assigned teachers
      await updateSubjectTeachers.mutateAsync({ subjectId, teacherIds });

      setDialogState({ type: null });
    } catch (err) {
      console.error("Error saving subject:", err);
    }
  };

  const handleDelete = () => {
    if (!dialogState.subjectIdToDelete) return;

    deleteSubject.mutate(dialogState.subjectIdToDelete, {
      onSuccess: () => setDialogState({ type: null }),
    });
  };

  if (subjectsLoading) return <p>جاري التحميل...</p>;

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
          <Button className="font-arabic" onClick={handleOpenAdd}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة مادة جديدة
          </Button>
        </div>

        {/* Subjects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects?.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              teachers={teachers}
              onEdit={() => handleOpenEdit(subject)}
              onDelete={() =>
                setDialogState({
                  type: "delete",
                  subjectIdToDelete: subject.id,
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Edit/Add Dialog */}
      {dialogState.type === "edit" && dialogState.form && (
        <SubjectDialog
          open={true}
          editMode={!!dialogState.form.id}
          form={dialogState.form}
          teachers={teachers}
          selectedTeacherIds={dialogState.selectedTeacherIds || []}
          onFormChange={(form) => setDialogState((prev) => ({ ...prev, form }))}
          onTeacherChange={(ids) =>
            setDialogState((prev) => ({ ...prev, selectedTeacherIds: ids }))
          }
          onClose={() => setDialogState({ type: null })}
          onSave={handleSave}
        />
      )}

      {/* Delete Dialog */}
      {dialogState.type === "delete" && (
        <DeleteSubjectDialog
          open={true}
          onClose={() => setDialogState({ type: null })}
          onConfirm={handleDelete}
        />
      )}
    </main>
  );
};

export default Subjects;
