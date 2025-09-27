// src/components/classrooms/DeleteConfirmModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="font-arabic">
        <DialogHeader>
          <DialogTitle>تأكيد الحذف</DialogTitle>
        </DialogHeader>
        <p>هل أنت متأكد أنك تريد حذف هذا الفصل؟</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;
