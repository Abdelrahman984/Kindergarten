// src/components/classroom/ClassroomFormModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  ApiClassroom,
  ClassroomCreateDto,
  ClassroomUpdateDto,
} from "@/api/classrooms";

interface ClassroomFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (dto: ClassroomCreateDto | ClassroomUpdateDto) => void;
  initialData?: ApiClassroom; // لو بنعدل
}

const ClassroomFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: ClassroomFormModalProps) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(20);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCapacity(initialData.capacity);
    } else {
      setName("");
      setCapacity(20);
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (initialData) {
      onSubmit({ id: initialData.id, name, capacity });
    } else {
      onSubmit({ name, capacity });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="font-arabic">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "تعديل الفصل" : "إضافة فصل جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm">اسم الفصل</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم الفصل"
            />
          </div>

          <div>
            <label className="text-sm">السعة</label>
            <Input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "حفظ التغييرات" : "إضافة"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomFormModal;
