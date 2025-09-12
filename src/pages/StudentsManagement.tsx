import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
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
import StudentForm from "../components/StudentForm";
import { useClassrooms } from "@/api/classrooms";
import { Calendar, Users } from "lucide-react";
import StatsCards from "@/components/StatsCards";
import StudentsTable from "@/components/StudentsTable";

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

  if (isLoading || isLoadingClassrooms) return <p>Loading...</p>;
  if (isError) return <p>Failed to load students.</p>;

  // Stats
  const totalStudents = students.length;
  const kg1Count = students.filter((s) => s.classroomName === "KG1").length;
  const kg2Count = students.filter((s) => s.classroomName === "KG2").length;
  const avgAttendance =
    students.reduce((sum, s) => sum + (s.attendanceRate ?? 0), 0) /
    (students.length || 1);

  const stats = [
    {
      label: "إجمالي الطلاب",
      value: totalStudents,
      icon: <Users className="w-6 h-6 text-primary-foreground" />,
      bgClass: "bg-gradient-islamic",
    },
    {
      label: "KG1",
      value: kg1Count,
      icon: <Users className="w-6 h-6 text-secondary-foreground" />,
      bgClass: "bg-gradient-sky",
    },
    {
      label: "KG2",
      value: kg2Count,
      icon: <Users className="w-6 h-6 text-orange-foreground" />,
      bgClass: "bg-gradient-warm",
    },
    {
      label: "معدل الحضور",
      value: `${avgAttendance.toFixed(0)}%`,
      icon: <Calendar className="w-6 h-6 text-primary-foreground" />,
      bgClass: "bg-gradient-islamic",
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
