import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Eye,
  Users,
  Calendar,
  Phone,
  MapPin,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  parentName: string;
  phone: string;
  address: string;
  attendance: number;
  avatar?: string;
}
const initialStudents: Student[] = [
  {
    id: "1",
    name: "أحمد محمد علي",
    class: "KG2",
    age: 5,
    parentName: "محمد علي أحمد",
    phone: "0501234567",
    address: "الرياض، حي النرجس",
    attendance: 96,
  },
  {
    id: "2",
    name: "فاطمة عبدالله",
    class: "KG1",
    age: 4,
    parentName: "عبدالله أحمد",
    phone: "0509876543",
    address: "الرياض، حي الملز",
    attendance: 92,
  },
  {
    id: "3",
    name: "يوسف خالد",
    class: "KG2",
    age: 5,
    parentName: "خالد محمد",
    phone: "0551122334",
    address: "الرياض، حي العليا",
    attendance: 98,
  },
  {
    id: "4",
    name: "عائشة سالم",
    class: "KG1",
    age: 4,
    parentName: "سالم أحمد",
    phone: "0544556677",
    address: "الرياض، حي الفلاح",
    attendance: 89,
  },
];

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({});
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState<string | null>(null);
  const [filterAge, setFilterAge] = useState<number | null>(null);

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class) return; // تحقق بسيط
    const student: Student = {
      id: (students.length + 1).toString(),
      name: newStudent.name,
      class: newStudent.class,
      age: newStudent.age || 0,
      parentName: newStudent.parentName || "",
      phone: newStudent.phone || "",
      address: newStudent.address || "",
      attendance: 100,
    };
    setStudents([...students, student]);
    setNewStudent({});
    console.log("تم إضافة طالب جديد:", student);
    console.log("قائمة الطلاب الحالية:", students);
  };
  const handleUpdateStudent = () => {
    if (!editingStudent) return;
    setStudents(
      students.map((s) => (s.id === editingStudent.id ? editingStudent : s))
    );
    setEditingStudent(null); // يقفل بعد الحفظ
  };
  const handleDeleteStudent = () => {
    if (!deletingStudent) return;
    setStudents(students.filter((s) => s.id !== deletingStudent.id));
    setDeletingStudent(null);
  };
  const studentsToDisplay = students.filter((student) => {
    const matchesSearch =
      student.name.includes(searchTerm) ||
      student.parentName.includes(searchTerm) ||
      student.class.includes(searchTerm);

    const matchesClass = filterClass ? student.class === filterClass : true;
    const matchesAge = filterAge ? student.age === filterAge : true;

    return matchesSearch && matchesClass && matchesAge;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-arabic">إدارة الطلاب</h1>
          <p className="text-muted-foreground font-arabic">
            إدارة بيانات الطلاب وملفاتهم الشخصية
          </p>
        </div>

        {/* Dialog لإضافة طالب جديد */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="islamic" size="lg" className="font-arabic">
              <Plus className="w-4 h-4 ml-2" />
              إضافة طالب جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-arabic">إضافة طالب جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="اسم الطالب"
                className="font-arabic text-right"
                value={newStudent.name || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <Input
                placeholder="الفصل"
                className="font-arabic text-right"
                value={newStudent.class || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, class: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="العمر"
                className="font-arabic text-right"
                value={newStudent.age || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, age: Number(e.target.value) })
                }
              />
              <Input
                placeholder="اسم ولي الأمر"
                className="font-arabic text-right"
                value={newStudent.parentName || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, parentName: e.target.value })
                }
              />
              <Input
                placeholder="رقم الهاتف"
                className="font-arabic text-right"
                value={newStudent.phone || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, phone: e.target.value })
                }
              />
              <Input
                placeholder="العنوان"
                className="font-arabic text-right"
                value={newStudent.address || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, address: e.target.value })
                }
              />
              <Button onClick={handleAddStudent} className="w-full font-arabic">
                حفظ
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog لتعديل طالب */}
        {editingStudent && (
          <Dialog
            open={!!editingStudent}
            onOpenChange={() => setEditingStudent(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-arabic">
                  تعديل بيانات الطالب
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  placeholder="اسم الطالب"
                  className="font-arabic text-right"
                  value={editingStudent.name}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="الفصل"
                  className="font-arabic text-right"
                  value={editingStudent.class}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      class: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="العمر"
                  className="font-arabic text-right"
                  value={editingStudent.age}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      age: Number(e.target.value),
                    })
                  }
                />
                <Input
                  placeholder="اسم ولي الأمر"
                  className="font-arabic text-right"
                  value={editingStudent.parentName}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      parentName: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="رقم الهاتف"
                  className="font-arabic text-right"
                  value={editingStudent.phone}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      phone: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="العنوان"
                  className="font-arabic text-right"
                  value={editingStudent.address}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      address: e.target.value,
                    })
                  }
                />
                <Button
                  onClick={handleUpdateStudent}
                  className="w-full font-arabic"
                >
                  حفظ التعديلات
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Dialog لعرض تفاصيل الطالب */}
        {viewingStudent && (
          <Dialog
            open={!!viewingStudent}
            onOpenChange={() => setViewingStudent(null)}
          >
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-arabic">تفاصيل الطالب</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 font-arabic text-right">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={viewingStudent.avatar} />
                    <AvatarFallback className="bg-gradient-islamic text-primary-foreground font-arabic">
                      {viewingStudent.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{viewingStudent.name}</h2>
                    <p className="text-muted-foreground">
                      {viewingStudent.class}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">العمر</p>
                    <p>{viewingStudent.age} سنوات</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ولي الأمر</p>
                    <p>{viewingStudent.parentName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">الهاتف</p>
                    <p>{viewingStudent.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">العنوان</p>
                    <p>{viewingStudent.address}</p>
                  </div>
                </div>

                <Badge
                  variant={
                    viewingStudent.attendance >= 95
                      ? "secondary"
                      : viewingStudent.attendance >= 85
                      ? "outline"
                      : "destructive"
                  }
                  className="mt-3"
                >
                  حضور {viewingStudent.attendance}%
                </Badge>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Dialog لتأكيد حذف طالب */}
        {deletingStudent && (
          <Dialog
            open={!!deletingStudent}
            onOpenChange={() => setDeletingStudent(null)}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-arabic text-red-600">
                  تأكيد الحذف
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 font-arabic text-right">
                <p>
                  هل أنت متأكد أنك تريد حذف الطالب{" "}
                  <span className="font-bold">{deletingStudent.name}</span>؟
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeletingStudent(null)}
                  >
                    إلغاء
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteStudent}>
                    نعم، حذف
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-soft transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground font-arabic">
                  إجمالي الطلاب
                </p>
                <p className="text-2xl font-bold font-arabic">156</p>
              </div>
              <div className="p-3 bg-gradient-islamic rounded-full">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-soft transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground font-arabic">
                  KG1
                </p>
                <p className="text-2xl font-bold font-arabic">78</p>
              </div>
              <div className="p-3 bg-gradient-sky rounded-full">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-soft transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground font-arabic">
                  KG2
                </p>
                <p className="text-2xl font-bold font-arabic">78</p>
              </div>
              <div className="p-3 bg-gradient-warm rounded-full">
                <Users className="w-6 h-6 text-orange-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-soft transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground font-arabic">
                  معدل الحضور
                </p>
                <p className="text-2xl font-bold font-arabic">94%</p>
              </div>
              <div className="p-3 bg-gradient-islamic rounded-full">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث عن الطلاب..."
                className="pr-10 font-arabic text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter by Class */}
            <Select
              value={filterClass || "all"}
              onValueChange={(value) =>
                setFilterClass(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-40 font-arabic text-right">
                <SelectValue placeholder="اختر الفصل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الفصل: الكل</SelectItem>
                <SelectItem value="KG1">KG1 :الفصل</SelectItem>
                <SelectItem value="KG2">KG2 :الفصل</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter by Age */}
            <Select
              value={filterAge ? filterAge.toString() : "all"}
              onValueChange={(value) =>
                setFilterAge(value === "all" ? null : Number(value))
              }
            >
              <SelectTrigger className="w-40 font-arabic text-right">
                <SelectValue placeholder="اختر العمر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">العمر: الكل</SelectItem>
                <SelectItem value="4">العمر: 4 سنوات</SelectItem>
                <SelectItem value="5">العمر: 5 سنوات</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button
              variant="outline"
              className="font-arabic"
              onClick={() => {
                setSearchTerm("");
                setFilterClass(null);
                setFilterAge(null);
              }}
            >
              إعادة تعيين
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic text-right">قائمة الطلاب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentsToDisplay.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:shadow-soft transition-smooth bg-card/50"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback className="bg-gradient-islamic text-primary-foreground font-arabic">
                      {student.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-right">
                    <h3 className="font-semibold font-arabic">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-arabic">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {student.class}
                      </span>
                      <span>{student.age} سنوات</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium font-arabic">
                    {student.parentName}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-arabic">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {student.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {student.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      student.attendance >= 95
                        ? "secondary"
                        : student.attendance >= 85
                        ? "outline"
                        : "destructive"
                    }
                    className="font-arabic"
                  >
                    حضور {student.attendance}%
                  </Badge>

                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewingStudent(student)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingStudent(student)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingStudent(student)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
