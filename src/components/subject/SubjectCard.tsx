import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Edit, Trash2, GraduationCap, Award } from "lucide-react";
import { ApiTeacher } from "@/api/teachers";
import { Subject } from "@/api/subjects";
import React, { useMemo } from "react";
import { avatarColors, getColorIndex } from "@/lib/utils";

function formatTeachers(teacherNames: string[]): string {
  if (teacherNames.length === 0) return "(لم يتم تحديد المعلم)";
  if (teacherNames.length > 2) {
    return (
      teacherNames.slice(0, 2).join(" - ") + ` +${teacherNames.length - 2}`
    );
  }
  return teacherNames.join(" - ");
}

interface SubjectCardProps {
  subject: Subject;
  teachers?: ApiTeacher[];
  progress?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  actions?: React.ReactNode; // للـ actions المخصصة
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  teachers,
  progress = 0,
  onEdit,
  onDelete,
  actions,
}) => {
  const subjectTeachers = useMemo(
    () => teachers?.filter((t) => t.subjectId === subject.id) || [],
    [teachers, subject.id]
  );

  const teacherNames = useMemo(
    () => subjectTeachers.map((t) => t.fullName),
    [subjectTeachers]
  );

  const teacherDisplay = useMemo(
    () => formatTeachers(teacherNames),
    [teacherNames]
  );

  const avatarColor = useMemo(
    () => avatarColors[getColorIndex(subject.id || subject.name)],
    [subject.id, subject.name]
  );

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          {/* Avatar + Subject Name */}
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${avatarColor}`}
            >
              <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="font-arabic text-lg">
                {subject.name}
              </CardTitle>
            </div>
          </div>

          {/* Default Actions (edit/delete) + Custom Actions */}
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                aria-label="تعديل المادة"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                aria-label="حذف المادة"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            {actions}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Teacher Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <GraduationCap
              className="w-4 h-4 text-blue-500"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-sm font-medium font-arabic">{teacherDisplay}</p>
            <p className="text-xs text-muted-foreground">معلم المادة</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-arabic">تقدم المنهج</span>
            <span>{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        {/* Learning Plan */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 font-arabic">
            <Award className="w-4 h-4 ml-2" /> خطة التعلم
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
