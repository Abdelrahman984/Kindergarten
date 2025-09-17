import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, GraduationCap, Phone, School } from "lucide-react";
import { useTeacherClassrooms } from "@/api/teachers";
import { ApiTeacher } from "@/api/teachers";
import { ApiClassroom } from "@/api/classrooms";

interface TeacherCardProps {
  teacher: ApiTeacher;
  onEdit?: (teacher: ApiTeacher) => void;
  onDelete?: (teacher: string) => void;
}

const TeacherCard = ({ teacher, onEdit, onDelete }: TeacherCardProps) => {
  const { data: classrooms, isLoading: classroomsLoading } =
    useTeacherClassrooms(teacher.id);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarFallback className="text-lg font-arabic bg-gradient-islamic text-primary-foreground">
            {teacher.fullName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="font-arabic">{teacher.fullName}</CardTitle>
        <Badge
          variant={teacher.isActive ? "default" : "secondary"}
          className="font-arabic"
        >
          <div className="m-auto">{teacher.isActive ? "نشط" : "غير نشط"}</div>
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-right">
          <div className="flex-1 text-right">
            <p className="font-arabic text-sm">{teacher.subjectName}</p>
          </div>
          <BookOpen className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2 text-right">
          <div className="flex-1 text-right">
            <p className="font-arabic text-sm">
              {teacher.phoneNumber ?? "غير متوفر"}
            </p>
          </div>
          <Phone className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2 text-right">
          <div className="flex-1">
            {classroomsLoading && <p>جاري تحميل الفصول...</p>}
            {classrooms &&
            Array.isArray(classrooms) &&
            classrooms.length > 0 ? (
              <div className="flex gap-2 text-sm font-arabic text-right flex-wrap">
                {classrooms.map((c: ApiClassroom, idx) => (
                  <span key={c.id} className="flex items-center gap-1">
                    {c.name}
                    {idx < classrooms.length - 1 && (
                      <span className="mx-1">-</span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              !classroomsLoading && (
                <p className="text-muted-foreground">لا يوجد فصول</p>
              )
            )}
          </div>
          <School className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 font-arabic"
            onClick={() => onEdit?.(teacher)}
          >
            تعديل
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1 font-arabic"
            onClick={() => onDelete?.(teacher.id)}
          >
            حذف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
