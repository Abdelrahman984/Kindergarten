// src/components/subject/DeleteSubjectDialog.tsx
import React from "react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

interface DeleteSubjectDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteSubjectDialog: React.FC<DeleteSubjectDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="تأكيد الحذف"
      message="هل أنت متأكد أنك تريد حذف هذه المادة؟ لا يمكن التراجع عن هذا الإجراء."
      confirmLabel="حذف"
      cancelLabel="إلغاء"
      destructive
    />
  );
};

export default DeleteSubjectDialog;
