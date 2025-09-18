import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { ApiTeacher } from "@/api/teachers";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Subject } from "@/api/subjects";

interface SubjectDialogProps {
  open: boolean;
  editMode: boolean;
  form: Subject;
  teachers?: ApiTeacher[];
  selectedTeacherIds: string[];
  onFormChange: (form: Subject) => void;
  onTeacherChange: (ids: string[]) => void;
  onClose: () => void;
  onSave: () => void;
}

const SubjectDialog: React.FC<SubjectDialogProps> = ({
  open,
  editMode,
  form,
  teachers,
  selectedTeacherIds,
  onFormChange,
  onTeacherChange,
  onClose,
  onSave,
}) => {
  const [confirmClose, setConfirmClose] = useState(false);

  // نحدد إذا فيه تغييرات غير محفوظة
  const isDirty = Boolean(form.name || selectedTeacherIds.length > 0);

  const handleRequestClose = () => {
    if (isDirty) {
      setConfirmClose(true);
    } else {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleRequestClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-arabic">
              {editMode ? "تعديل مادة" : "إضافة مادة جديدة"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="font-arabic mb-1 block">اسم المادة</label>
            <Input
              placeholder="اسم المادة"
              value={form.name ?? ""}
              onChange={(e) => onFormChange({ ...form, name: e.target.value })}
              className="font-arabic text-right bg-white border-gray-300 w-full"
            />
            <div>
              <label className="font-arabic mb-1 block">اختر المعلمين</label>
              <Select
                isMulti
                options={
                  teachers?.map((t) => ({ value: t.id, label: t.fullName })) ||
                  []
                }
                value={
                  teachers
                    ?.filter((t) => selectedTeacherIds.includes(t.id))
                    .map((t) => ({ value: t.id, label: t.fullName })) || []
                }
                onChange={(selected) => {
                  onTeacherChange(
                    (selected as { value: string; label: string }[]).map(
                      (opt) => opt.value
                    )
                  );
                }}
                className="w-full rounded-lg"
                classNamePrefix="react-select"
                placeholder="اختر المعلمين"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onSave} className="font-arabic">
              {editMode ? "حفظ التغييرات" : "إضافة"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Close Dialog */}
      <ConfirmDialog
        open={confirmClose}
        onClose={() => setConfirmClose(false)}
        onConfirm={() => {
          setConfirmClose(false);
          onClose();
        }}
        title="إغلاق بدون حفظ"
        message="هل أنت متأكد أنك تريد إغلاق النموذج بدون حفظ التغييرات؟"
        confirmLabel="نعم، إغلاق"
        cancelLabel="رجوع"
        destructive
      />
    </>
  );
};

export default SubjectDialog;
