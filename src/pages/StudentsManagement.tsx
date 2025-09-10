import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
  type ApiStudent,
  type StudentCreateDto,
  type StudentUpdateDto,
} from "@/api/students";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCards from "@/components/StatsCards";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Eye,
  Phone,
  MapPin,
  Trash,
  Users,
  Calendar,
} from "lucide-react";
import { useClassrooms } from "@/api/classrooms";

// ======================
// UI Student Model
// ======================
interface Student {
  id: string;
  name: string;
  father?: string;
  grandfather?: string;
  age: number;
  parentName?: string;
  phone?: string;
  isActive: boolean;
  classroomId?: string;
  class?: string;
  attendance?: number;
  address?: string;
  dateOfBirth?: string;
}

// تحويل من API → UI
function mapApiStudent(api: ApiStudent): Student {
  // Split FullName into name, father, grandfather if possible
  const nameParts = api.fullName ? api.fullName.split(" ") : [];
  return {
    id: api.id,
    name: nameParts[0] || "",
    father: nameParts[1] || "",
    grandfather: nameParts[2] || "",
    age: new Date().getFullYear() - new Date(api.dateOfBirth).getFullYear(),
    phone: api.parentPhone,
    isActive: api.isActive,
    classroomId: api.classroomId,
    class: api.classroomName ?? "",
    attendance: api.attendanceRate ?? 0,
    address: api.address ?? "",
    dateOfBirth: api.dateOfBirth ?? "",
    parentName: api.parentFullName ?? "",
  };
}

// تحويل من UI → DTO Create
function mapToCreateDto(s: Partial<Student>): StudentCreateDto {
  return {
    FirstName: s.name!,
    FatherName: s.father!,
    GrandpaName: s.grandfather!,
    DateOfBirth: s.dateOfBirth!,
    ParentPhone: s.phone!,
    Address: s.address!,
    ClassroomId: s.classroomId!,
  };
}

// تحويل من UI → DTO Update
function mapToUpdateDto(s: Student): StudentUpdateDto {
  return {
    id: s.id,
    FirstName: s.name,
    FatherName: s.father!,
    GrandpaName: s.grandfather!,
    DateOfBirth: s.dateOfBirth!,
    ParentPhone: s.phone!,
    Address: s.address!,
    ClassroomId: s.classroomId!,
  };
}

// ======================
// Component
const StudentsManagement = () => {
  const navigate = useNavigate();
  const { data: apiStudents = [], isLoading } = useStudents();
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const [newStudent, setNewStudent] = useState<Partial<Student>>({});
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const students: Student[] = apiStudents.map(mapApiStudent);
  const [filterClass, setFilterClass] = useState<string | null>(null);

  const studentsToDisplay = students.filter((student) => {
    const matchesSearch =
      student.name.includes(searchTerm) ||
      student.parentName.includes(searchTerm) ||
      student.class.includes(searchTerm);

    const matchesClass = filterClass ? student.class === filterClass : true;

    return matchesSearch && matchesClass;
  });

  // useClassrooms
  const { data: classrooms = [] } = useClassrooms();

  // Stats
  const totalStudents = students.length;
  const kg1Count = students.filter((s) => s.class === "KG1").length;
  const kg2Count = students.filter((s) => s.class === "KG2").length;
  const avgAttendance =
    students.reduce((sum, s) => sum + (s.attendance ?? 0), 0) /
    (students.length || 1);

  const stats = [
    {
      label: "إجمالي الطلاب",
      value: totalStudents,
      icon: <Users className="w-6 h-6 text-primary-foreground" />,
      bgClass: "bg-gradient-islamic",
    },
    {
      label: "KG1",
      value: kg1Count,
      icon: <Users className="w-6 h-6 text-secondary-foreground" />,
      bgClass: "bg-gradient-sky",
    },
    {
      label: "KG2",
      value: kg2Count,
      icon: <Users className="w-6 h-6 text-orange-foreground" />,
      bgClass: "bg-gradient-warm",
    },
    {
      label: "معدل الحضور",
      value: `${avgAttendance.toFixed(0)}%`,
      icon: <Calendar className="w-6 h-6 text-primary-foreground" />,
      bgClass: "bg-gradient-islamic",
    },
  ];

  // Handlers
  const handleAddStudent = async () => {
    if (
      !newStudent.name ||
      !newStudent.father ||
      !newStudent.grandfather ||
      !newStudent.classroomId
    ) {
      alert("من فضلك أدخل جميع البيانات المطلوبة واختر الفصل");
      return;
    }
    await createStudent.mutateAsync(mapToCreateDto(newStudent));
    setNewStudent({});
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    await updateStudent.mutateAsync(mapToUpdateDto(editingStudent));
    setEditingStudent(null);
  };

  const handleDeleteStudent = async () => {
    if (!deletingStudent) return;
    await deleteStudent.mutateAsync(deletingStudent.id);
    setDeletingStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-arabic">إدارة الطلاب</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="islamic" size="lg" className="font-arabic">
              <Plus className="w-4 h-4 ml-2" /> إضافة طالب
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-arabic">إضافة طالب جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="اسم الطفل"
                value={newStudent.name || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <Input
                placeholder="اسم الأب"
                value={newStudent.father || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, father: e.target.value })
                }
              />
              <Input
                placeholder="اسم الجد"
                value={newStudent.grandfather || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, grandfather: e.target.value })
                }
              />
              <Input
                className="text-right"
                type="date"
                placeholder="تاريخ الميلاد"
                value={newStudent.dateOfBirth || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, dateOfBirth: e.target.value })
                }
              />
              <Input
                placeholder="رقم ولي الأمر"
                value={newStudent.phone || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, phone: e.target.value })
                }
              />
              <Input
                placeholder="العنوان"
                value={newStudent.address || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, address: e.target.value })
                }
              />
              {/* Select Classroom */}
              <Select
                value={newStudent.classroomId || ""}
                onValueChange={(value) =>
                  setNewStudent({
                    ...newStudent,
                    classroomId: value, // هنا value = c.id من الـ API
                  })
                }
              >
                <SelectTrigger className="font-arabic text-right">
                  <SelectValue placeholder="اختر الفصل" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleAddStudent} className="w-full font-arabic">
                حفظ
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

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

            {/* Reset Button */}
            <Button
              variant="outline"
              className="font-arabic"
              onClick={() => {
                setSearchTerm("");
                setFilterClass(null);
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
          {isLoading && <p>جاري التحميل...</p>}
          <div className="space-y-3">
            {studentsToDisplay.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-3 border rounded"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={undefined} />
                    <AvatarFallback>
                      {s.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {`${s.name} ${s.father ?? ""} ${
                        s.grandfather ?? ""
                      }`.trim()}
                    </h3>
                    <p className="text-sm text-muted-foreground">{s.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-arabic">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {s.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {s.address}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={s.isActive ? "secondary" : "destructive"}>
                    {s.isActive ? "نشط" : "موقوف"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/students/${s.id}`)}
                  >
                    <Eye />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingStudent(s)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingStudent(s)}
                  >
                    <Trash className="text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit / View / Delete dialogs */}
      {editingStudent && (
        <Dialog open onOpenChange={() => setEditingStudent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل طالب</DialogTitle>
            </DialogHeader>
            <Input
              value={editingStudent.name}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, name: e.target.value })
              }
            />
            <Input
              value={editingStudent.father || ""}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, father: e.target.value })
              }
            />
            <Input
              value={editingStudent.grandfather || ""}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  grandfather: e.target.value,
                })
              }
            />
            <Input
              type="number"
              value={editingStudent.age}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  age: Number(e.target.value),
                })
              }
            />
            <Input
              value={editingStudent.phone}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, phone: e.target.value })
              }
            />
            <Button onClick={handleUpdateStudent}>حفظ</Button>
          </DialogContent>
        </Dialog>
      )}

      {deletingStudent && (
        <Dialog open onOpenChange={() => setDeletingStudent(null)}>
          <DialogContent>
            <p>هل أنت متأكد من حذف الطالب {deletingStudent.name}؟</p>
            <Button onClick={handleDeleteStudent} variant="destructive">
              نعم
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Navigate to StudentPage instead of dialog */}
      {/* ...existing code... */}
    </div>
  );
};

export default StudentsManagement;
