import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ApiTeacher, TeacherCreateDto, TeacherUpdateDto } from "@/api/teachers";
import { ApiClassroom, useClassrooms } from "@/api/classrooms";
import { Subject, useSubjects } from "@/api/subjects"; // 👈 لازم تعمل hook subjects
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeacherFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (teacher: TeacherCreateDto | TeacherUpdateDto) => void; // DTOs (TeacherCreateDto | TeacherUpdateDto)
  initialData?: ApiTeacher;
}

const TeacherForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: TeacherFormProps) => {
  const { data: classrooms = [] } = useClassrooms();
  const { data: subjects = [] } = useSubjects();

  const [fullName, setFullName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setSubjectId(initialData.subjectId ?? ""); // 👈 ناخد id
      setPhoneNumber(initialData.phoneNumber ?? "");
      setIsActive(initialData.isActive);
      setSelectedClassrooms(initialData.classroomIds ?? []);
    } else {
      setFullName("");
      setSubjectId("");
      setPhoneNumber("");
      setIsActive(true);
      setSelectedClassrooms([]);
    }
  }, [initialData]);

  const toggleClassroom = (id: string) => {
    setSelectedClassrooms((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const teacherPayload: TeacherCreateDto | TeacherUpdateDto = initialData
      ? {
          id: initialData.id,
          fullName,
          subjectId,
          phoneNumber,
          isActive,
          classroomIds: selectedClassrooms,
        }
      : {
          fullName,
          subjectId,
          phoneNumber,
          isActive,
          classroomIds: selectedClassrooms,
        };

    onSubmit(teacherPayload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-arabic">
            {initialData ? "تعديل معلم" : "إضافة معلم جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 font-arabic">
          <div>
            <Label>الاسم الكامل</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <Label>المادة</Label>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر مادة" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s: Subject) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>رقم الهاتف</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <Label>نشط</Label>
          </div>

          <div>
            <Label>الفصول</Label>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto p-2 border rounded-lg">
              {classrooms.map((c: ApiClassroom) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedClassrooms.includes(c.id)}
                    onCheckedChange={() => toggleClassroom(c.id)}
                  />
                  <span>{c.name}</span>
                </label>
              ))}
              {classrooms.length === 0 && (
                <p className="text-muted-foreground text-sm">لا يوجد فصول</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "تحديث" : "إضافة"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherForm;
