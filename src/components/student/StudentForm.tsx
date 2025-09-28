import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ApiStudent } from "../../api/students";
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
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentAddress, setParentAddress] = useState("");

  // لو في initialData (تعديل)
  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setDateOfBirth(initialData.dateOfBirth.split("T")[0]);
      setAddress(initialData.address);
      setClassroomId(initialData.classroomId);
      setParentName(initialData.parentName);
      setParentPhone(initialData.parentPhone);
      setParentAddress(initialData.parentAddress);
    } else {
      setFullName("");
      setDateOfBirth("");
      setAddress("");
      setClassroomId("");
      setParentName("");
      setParentPhone("");
      setParentAddress("");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    const student: Partial<ApiStudent> = {
      id: initialData?.id,
      fullName,
      dateOfBirth,
      address,
      classroomId,
      parentName,
      parentPhone,
      parentAddress,
    };
    onSubmit(student);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
      <DialogTitle>{initialData ? "تعديل الطالب" : "إضافة طالب"}</DialogTitle>
      <DialogContent dividers dir="rtl" className="text-right">
        <TextField
          label="الاسم الكامل"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <DatePicker
          label="تاريخ الميلاد"
          value={dateOfBirth ? new Date(dateOfBirth) : null}
          onChange={(newVal) => {
            if (newVal instanceof Date && !isNaN(newVal.getTime())) {
              // keep same format (YYYY-MM-DD) as initialData
              setDateOfBirth(format(newVal, "yyyy-MM-dd"));
            } else {
              setDateOfBirth("");
            }
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal",
            },
          }}
        />
        <TextField
          label="العنوان"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
          dir="rtl"
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
        <TextField
          label="اسم ولي الأمر الكامل"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          fullWidth
          margin="normal"
        />{" "}
        <TextField
          label="رقم ولي الأمر"
          value={parentPhone}
          onChange={(e) => setParentPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="عنوان ولي الأمر"
          value={parentAddress}
          onChange={(e) => setParentAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
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
