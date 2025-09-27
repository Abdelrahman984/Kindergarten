// src/pages/Classroom.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Clock, Edit, Loader2 } from "lucide-react";
import {
  ApiClassroom,
  useClassroomsWithDetails,
  useCreateClassroom,
  useDeleteClassroom,
  useUpdateClassroom,
} from "@/api/classrooms";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import { useState } from "react";
import ClassroomFormModal from "@/components/classroom/ClassroomFormModal";
import DeleteConfirmModal from "@/components/classroom/DeleteConfirmModal";
import { Delete } from "@mui/icons-material";

const Classroom = () => {
  const { data: classrooms, isLoading, isError } = useClassroomsWithDetails();
  const createMutation = useCreateClassroom();
  const updateMutation = useUpdateClassroom();
  const deleteMutation = useDeleteClassroom();

  const [openForm, setOpenForm] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<ApiClassroom | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) <SkeletonLoading />;

  if (isError) {
    return (
      <div className="text-center text-red-500 font-arabic">
        حدث خطأ أثناء تحميل الفصول
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="text-right">
          <h1 className="text-3xl font-bold font-arabic">
            إدارة الفصول الدراسية
          </h1>
          <p className="text-muted-foreground font-arabic">
            إدارة الفصول والأنشطة التعليمية
          </p>
        </div>
        <Button
          className="font-arabic w-full sm:w-auto"
          onClick={() => setOpenForm(true)}
        >
          إضافة فصل جديد
        </Button>{" "}
      </div>

      {/* Classrooms Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {classrooms?.map((classroom) => (
          <Card
            key={classroom.id}
            className="hover:shadow-lg transition-shadow flex flex-col"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-arabic text-right">
                    {classroom.name}
                  </CardTitle>
                </div>

                {/* Actions */}
                <div>
                  {/* Edit Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingClassroom(classroom);
                      setOpenForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeletingId(classroom.id)}
                  >
                    <Delete className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 flex-1 flex flex-col">
              {/* Teachers */}
              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  المعلمات :
                </div>
                {classroom.teacherNames?.length ? (
                  <div className="flex items-center gap-2 text-right">
                    <span className="font-arabic text-sm flex flex-wrap gap-1">
                      {classroom.teacherNames.map((name, index) => (
                        <Badge key={index} className="font-arabic">
                          {name}
                        </Badge>
                      ))}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Students Count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-right">
                  <span className="font-arabic text-sm">
                    عدد الطلاب / السعة
                  </span>
                  <span className="text-sm">
                    {classroom.studentsCount}/{classroom.capacity}
                  </span>
                </div>
                <Progress
                  value={(classroom.studentsCount / classroom.capacity) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Classroom Form Modal */}
      <ClassroomFormModal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingClassroom(null);
        }}
        initialData={editingClassroom || undefined}
        onSubmit={(dto) => {
          if ("id" in dto) updateMutation.mutate(dto);
          else createMutation.mutate(dto);
        }}
      />

      <DeleteConfirmModal
        open={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) deleteMutation.mutate(deletingId);
          setDeletingId(null);
        }}
      />
    </div>
  );
};

export default Classroom;
