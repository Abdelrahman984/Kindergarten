import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ApiClassroom, useClassrooms } from "@/api/classrooms";

import { ApiTeacher, useTeachers } from "@/api/teachers";
import { Subject, useSubjects } from "@/api/subjects";
import {
  ClassSessionCreateDto,
  ClassSessionUpdateDto,
  ApiClassSession,
} from "@/api/classSessions";

interface SessionFormProps {
  session?: ApiClassSession | null;
  onSubmit: (data: ClassSessionCreateDto | ClassSessionUpdateDto) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void; // optional delete handler
}

export const SessionForm = ({
  session,
  onSubmit,
  onCancel,
  onDelete,
}: SessionFormProps) => {
  const [startTime, setStartTime] = useState(session?.startTime || "");
  const [endTime, setEndTime] = useState(session?.endTime || "");
  const [classroomId, setClassroomId] = useState(session?.classroomId || "");
  const [teacherId, setTeacherId] = useState(session?.teacherId || "");
  const [subjectId, setSubjectId] = useState(session?.subjectId || "");

  // Fetch options from backend
  const { data: classrooms = [] } = useClassrooms();
  const { data: teachers = [] } = useTeachers();
  const { data: subjects = [] } = useSubjects();

  useEffect(() => {
    // pre-fill dropdowns if editing
    if (session) {
      setClassroomId(session.classroomId || "");
      setTeacherId(session.teacherId || "");
      setSubjectId(session.subjectId || "");
    }
  }, [session]);

  const handleSubmit = () => {
    if (session) {
      onSubmit({
        id: session.id,
        startTime,
        endTime,
        classroomId,
        teacherId,
        subjectId,
      });
    } else {
      onSubmit({ startTime, endTime, classroomId, teacherId, subjectId });
    }
  };

  return (
    <div className="space-y-4 font-arabic">
      <div>
        <label>وقت البداية</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>وقت النهاية</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>الفصل الدراسي</label>
        <select
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">اختر الفصل</option>
          {classrooms.map((c: ApiClassroom) => (
            <option key={c.id} value={c.id}>
              {c.name} (سعة: {c.capacity})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>المعلم</label>
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">اختر المعلم</option>
          {teachers.map((t: ApiTeacher) => (
            <option key={t.id} value={t.id}>
              {t.fullName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>المادة</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">اختر المادة</option>
          {subjects.map((s: Subject) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 ml-auto">
        <Button variant="secondary" onClick={onCancel}>
          خروج
        </Button>
        <Button onClick={handleSubmit}>{session ? "تحديث" : "إضافة"}</Button>
        {/* Delete button only shows when editing */}
        {session && onDelete && (
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("هل أنت متأكد من حذف هذه الحصة؟")) {
                onDelete(session.id);
              }
            }}
          >
            حذف
          </Button>
        )}
      </div>

    </div>
  );
};
export default SessionForm;
