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
import { ApiTeacher } from "@/api/teachers";
import { ApiClassroom, useClassrooms } from "@/api/classrooms";
import { Checkbox } from "@/components/ui/checkbox";

interface TeacherFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (teacher: Omit<ApiTeacher, "id"> | ApiTeacher) => void;
  initialData?: ApiTeacher;
}

const TeacherForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: TeacherFormProps) => {
  const { data: classrooms = [] } = useClassrooms();

  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setSubject(initialData.subject);
      setPhoneNumber(initialData.phoneNumber ?? "");
      setIsActive(initialData.isActive);
      setSelectedClassrooms(initialData.classroomIds ?? []); // لازم تضيف classroomIds في ApiTeacher
    } else {
      setFullName("");
      setSubject("");
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
    const teacher = {
      fullName,
      subject,
      phoneNumber,
      isActive,
      classroomIds: selectedClassrooms,
    } as ApiTeacher;

    if (initialData) teacher.id = initialData.id; // تعديل
    onSubmit(teacher);
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
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
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
