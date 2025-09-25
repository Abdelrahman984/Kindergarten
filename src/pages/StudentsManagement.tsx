import { useState } from "react";
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
} from "../api/students";
import StudentForm from "../components/student/StudentForm";
import { useClassrooms } from "@/api/classrooms";
import { Calendar, Users } from "lucide-react";
import StatsCards from "@/components/shared/StatsCards";
import StudentsTable from "@/components/student/StudentsTable";
import SkeletonLoading from "@/components/shared/SkeletonLoading";

interface Classroom {
  id: string;
  name: string;
}

export default function StudentsManagement() {
  const { data: students, isLoading, isError } = useStudents();
  const { data: classrooms, isLoading: isLoadingClassrooms } = useClassrooms();
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
    if (isLoading || isLoadingClassrooms) return <SkeletonLoading />;
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

  if (isLoading || isLoadingClassrooms) return <p>Loading...</p>;
  if (isError) return <p>Failed to load students.</p>;

  // Stats
  const totalStudents = students.length;
  const kg1Count = students.filter((s) => s.classroomName === "KG1").length;
  const kg2Count = students.filter((s) => s.classroomName === "KG2").length;
  const kg3Count = students.filter((s) => s.classroomName === "KG3").length;
  const avgAttendance =
    students.reduce((sum, s) => sum + (s.attendanceRate ?? 0), 0) /
    (students.length || 1);

  const stats = [
    {
      label: "إجمالي الطلاب",
      value: totalStudents,
      icon: <Users className="w-6 h-6 text-blue-400" />,
      bgClass: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      label: "KG1",
      value: kg1Count,
      icon: <Users className="w-6 h-6 text-green-400" />,
      bgClass: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      label: "KG2",
      value: kg2Count,
      icon: <Users className="w-6 h-6 text-yellow-400" />,
      bgClass: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
    {
      label: "KG3",
      value: kg3Count,
      icon: <Users className="w-6 h-6 text-purple-400" />,
      bgClass: "bg-gradient-to-r from-purple-400 to-purple-600",
    },
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
