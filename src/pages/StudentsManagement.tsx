// src/pages/StudentsManagement.tsx
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
  mapToCreateDto,
  mapToUpdateDto,
  ApiStudent,
  useStudentStats,
} from "../api/students";
import StudentForm from "../components/student/StudentForm";
import {
  useClassrooms,
  useClassroomStudentCount,
  ClassroomStudentCount,
} from "@/api/classrooms";
import { Users } from "lucide-react";
import StatsCards from "@/components/shared/StatsCards";
import StudentsTable from "@/components/student/StudentsTable";
import SkeletonLoading from "@/components/shared/SkeletonLoading";

export default function StudentsManagement() {
  const { data: students, isLoading, isError } = useStudents();
  const { data: studentsStats } = useStudentStats();
  const { data: classrooms, isLoading: isLoadingClassrooms } = useClassrooms();
  const { data: classroomCounts } = useClassroomStudentCount();
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<ApiStudent | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<ApiStudent | null>(
    null
  );

  const handleCreate = () => {
    setEditingStudent(null);
    setFormOpen(true);
  };

  const handleEdit = (student: ApiStudent) => {
    setEditingStudent(student);
    setFormOpen(true);
  };

  const handleDelete = (student: ApiStudent) => {
    setDeletingStudent(student);
  };

  const confirmDelete = () => {
    if (deletingStudent) {
      deleteStudent.mutate(deletingStudent.id);
      setDeletingStudent(null);
    }
  };

  const handleSubmit = (student: Partial<ApiStudent>) => {
    if (student.id) {
      updateStudent.mutate(mapToUpdateDto(student as ApiStudent));
    } else {
      createStudent.mutate(mapToCreateDto(student as ApiStudent));
    }
  };

  if (isLoading || isLoadingClassrooms) return <SkeletonLoading />;
  if (isError) return <p>Failed to load students.</p>;

  // Stats
  const totalStudents = studentsStats?.total ?? 0;

  // color palettes to assign to classrooms cyclically
  const palette = [
    "text-green-400",
    "text-yellow-400",
    "text-purple-400",
    "text-pink-400",
    "text-teal-400",
  ];

  // Build classroom stats directly from ClassroomStudentCount
  const classroomCards = (classroomCounts || []).map((cc, idx) => {
    const pal = palette[idx % palette.length];
    return {
      label: cc.classroomName,
      value: cc.studentCount,
      icon: <Users className={`w-6 h-6 ${pal}`} />,
    };
  });

  const stats = [
    {
      label: "إجمالي الطلاب",
      value: totalStudents,
      icon: <Users className="w-6 h-6 text-blue-400" />,
      bgClass: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    ...classroomCards,
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold font-arabic">إدارة الطلاب</h2>
        <Button color="primary" onClick={handleCreate} className="font-arabic">
          إضافة طالب
        </Button>
      </div>
      {/* Stats Display */}
      <div className="mb-6">
        <StatsCards stats={stats} />
      </div>

      <StudentsTable
        students={students}
        classrooms={classrooms || []}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Student Form */}
      <StudentForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingStudent || undefined}
        classrooms={classrooms || []}
      />

      {/* Delete Confirmation */}
      <Dialog open={!!deletingStudent} onClose={() => setDeletingStudent(null)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          هل أنت متأكد أنك تريد حذف الطالب{" "}
          <strong>{deletingStudent?.fullName}</strong>؟
        </DialogContent>
        <DialogActions>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeletingStudent(null)}
              className="font-arabic"
            >
              إلغاء
            </Button>
            <Button
              onClick={confirmDelete}
              className="font-arabic bg-red-600 text-white hover:bg-red-700"
            >
              حذف
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
