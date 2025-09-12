import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { ApiStudent } from "../api/students";
import { Button } from "@/components/ui/button";

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (student: Partial<ApiStudent>) => void;
  initialData?: ApiStudent;
  classrooms: { id: string; name: string }[]; // لعرض الكلاسات في الـ select
}

export default function StudentForm({
  open,
  onClose,
  onSubmit,
  initialData,
  classrooms,
}: StudentFormProps) {
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandpaName, setGrandpaName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [address, setAddress] = useState("");
  const [classroomId, setClassroomId] = useState("");

  // لو في initialData (تعديل)
  useEffect(() => {
    if (initialData) {
      const parts = initialData.fullName.split(" ");
      setFirstName(parts[0] ?? "");
      setFatherName(parts[1] ?? "");
      setGrandpaName(parts[2] ?? "");
      setDateOfBirth(initialData.dateOfBirth.split("T")[0]);
      setParentPhone(initialData.parentPhone);
      setAddress(initialData.address);
      setClassroomId(initialData.classroomId);
    } else {
      setFirstName("");
      setFatherName("");
      setGrandpaName("");
      setDateOfBirth("");
      setParentPhone("");
      setAddress("");
      setClassroomId("");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    const student: Partial<ApiStudent> = {
      id: initialData?.id,
      fullName: `${firstName} ${fatherName} ${grandpaName}`.trim(),
      dateOfBirth,
      parentPhone,
      address,
      classroomId,
    };
    onSubmit(student);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "تعديل الطالب" : "إضافة طالب"}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="الاسم الأول"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="اسم الأب"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="اسم الجد"
          value={grandpaName}
          onChange={(e) => setGrandpaName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="تاريخ الميلاد"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="رقم ولي الأمر"
          value={parentPhone}
          onChange={(e) => setParentPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="العنوان"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="الفصل"
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
          fullWidth
          margin="normal"
        >
          {classrooms.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="font-arabic">
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            className="font-arabic bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {initialData ? "حفظ التعديلات" : "إضافة"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
