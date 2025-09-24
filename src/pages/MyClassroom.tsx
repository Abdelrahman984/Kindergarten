// src/pages/MyClassroom.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClassroomHeader from "@/components/my_classroom/ClassroomHeader";
import ClassroomSelector from "@/components/my_classroom/ClassroomSelector";
import ClassroomInfo from "@/components/my_classroom/ClassroomInfo";
import StudentsList from "@/components/my_classroom/StudentsList";
import TodaySchedule from "@/components/my_classroom/TodaySchedule";
import QuickActions from "@/components/my_classroom/QuickActions";

import { useMyClassrooms, useMySessions } from "@/api/teacherMe";
import type { TeacherClassroom } from "@/api/classrooms";
import type { ApiStudent } from "@/api/students";
import type { ApiClassSession } from "@/api/classSessions";

const MyClassroom = () => {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ✅ Get classrooms (with students inside)
  const { data: classrooms, isLoading: loadingClassrooms } =
    useMyClassrooms() as {
      data: TeacherClassroom[] | undefined;
      isLoading: boolean;
    };

  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(
    null
  );

  // حدد الفصل الافتراضي عند تحميل البيانات
  useEffect(() => {
    if (classrooms && classrooms.length && !selectedClassroomId) {
      setSelectedClassroomId(classrooms[0].id);
    }
  }, [classrooms, selectedClassroomId]);

  // ✅ sessions still linked to classroomId
  const { data: sessions, isLoading: loadingSessions } = useMySessions();

  const [search, setSearch] = useState("");

  const classroomList = classrooms as TeacherClassroom[];
  const sessionList = (sessions as ApiClassSession[]) || [];

  if (loadingClassrooms || loadingSessions) {
    return <div className="p-6">⏳ جاري التحميل...</div>;
  }

  if (!classroomList?.length) {
    return (
      <div className="p-6 text-red-600">🚫 لا يوجد فصول مرتبطة بك حالياً</div>
    );
  }

  const classroom =
    classroomList.find((c) => c.id === selectedClassroomId) || classroomList[0];

  // ✅ الطلاب جايين من الـ classroom مباشرة
  const studentList = classroom.students || [];

  // فلترة الطلاب حسب البحث
  const filteredStudents = studentList.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase())
  );

  // حصص اليوم فقط
  const today = new Date().toISOString().split("T")[0];
  const todaySessions = sessionList.filter(
    (s) => s.startTime && s.startTime.split("T")[0] === today
  );

  const attendanceRate = Math.round(
    studentList.reduce((sum, s) => sum + (s.attendanceRate ?? 0), 0) /
      (studentList.length || 1)
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <ClassroomHeader onSendMessage={() => {}} onShowReport={() => {}} />

        <ClassroomSelector
          classrooms={classroomList.map((c) => ({ id: c.id, name: c.name }))}
          selectedClassroomId={selectedClassroomId}
          onChange={setSelectedClassroomId}
        />

        <ClassroomInfo
          name={classroom.name}
          studentsCount={studentList.length}
          capacity={classroom.capacity}
          schedule={classroom.schedule}
          presentCount={studentList.filter((s) => s.isActive).length}
          attendanceRate={attendanceRate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <StudentsList
              students={filteredStudents as ApiStudent[]}
              search={search}
              onSearchChange={setSearch}
            />
          </div>

          <div className="space-y-6">
            <TodaySchedule sessions={todaySessions} />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassroom;
