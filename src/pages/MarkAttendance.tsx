import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  useDailyWithUnmarked,
  useMarkAttendance,
  AttendanceReadDto,
} from "@/api/attendances";
import { ClockArrowUp } from "lucide-react";

const MarkAttendance = () => {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [initialNotes, setInitialNotes] = useState<Record<string, string>>({});
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [arrivalTimes, setArrivalTimes] = useState<Record<string, string>>({});
  const [initialArrivalTimes, setInitialArrivalTimes] = useState<
    Record<string, string>
  >({});
  const [activeArrival, setActiveArrival] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split("T")[0];
  const { data: todayAttendanceData } = useDailyWithUnmarked(todayStr);
  const markAttendance = useMarkAttendance();

  const todayAttendance: AttendanceReadDto[] = React.useMemo(() => {
    return Array.isArray(todayAttendanceData) ? todayAttendanceData : [];
  }, [todayAttendanceData]);

  const [selectedStatus, setSelectedStatus] = useState<
    Record<string, 0 | 1 | 2 | 3>
  >({});
  const [initialStatus, setInitialStatus] = useState<
    Record<string, 0 | 1 | 2 | 3>
  >({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<
    Array<{ studentId: string; status: 0 | 1 | 2 | 3 }>
  >([]);

  React.useEffect(() => {
    if (todayAttendance.length > 0) {
      const initial: Record<string, 0 | 1 | 2 | 3> = {};
      const initialNotesObj: Record<string, string> = {};
      const initialArrivalObj: Record<string, string> = {};
      todayAttendance.forEach((student) => {
        initial[student.studentId] =
          student.status !== null && student.status !== undefined
            ? (student.status as 0 | 1 | 2 | 3)
            : 0; // Default to Unmarked (0)
        initialNotesObj[student.studentId] = student.notes || "";
        initialArrivalObj[student.studentId] = student.arrivalTime || "";
      });
      setSelectedStatus(initial);
      setInitialStatus(initial);
      setNotes(initialNotesObj);
      setInitialNotes(initialNotesObj);
      setArrivalTimes(initialArrivalObj);
      setInitialArrivalTimes(initialArrivalObj);
    }
  }, [todayAttendance]);

  React.useEffect(() => {
    const changes: Array<{
      studentId: string;
      status: 0 | 1 | 2 | 3 | null;
      notesChanged?: boolean;
      arrivalTimeChanged?: boolean;
    }> = [];
    Object.entries(selectedStatus).forEach(([studentId, status]) => {
      const statusChanged = status !== initialStatus[studentId];
      const noteChanged =
        (notes[studentId] || "") !== (initialNotes[studentId] || "");
      const arrivalChanged =
        (arrivalTimes[studentId] || "") !==
        (initialArrivalTimes[studentId] || "");
      if (statusChanged || noteChanged || arrivalChanged) {
        changes.push({
          studentId,
          status,
          notesChanged: noteChanged,
          arrivalTimeChanged: arrivalChanged,
        });
      }
    });
    setPendingChanges(changes);
  }, [
    selectedStatus,
    initialStatus,
    notes,
    initialNotes,
    arrivalTimes,
    initialArrivalTimes,
  ]);

  const handleMark = (studentId: string, status: 0 | 1 | 2 | 3) => {
    setSelectedStatus((prev) => ({ ...prev, [studentId]: status }));
    setArrivalTimes((prev) => {
      // If changing away from 'late', reset arrival time
      if (status !== 3 && prev[studentId]) {
        return { ...prev, [studentId]: "" };
      }
      return prev;
    });
    // Optionally, also reset activeArrival if status is not late
    if (status !== 3 && activeArrival === studentId) {
      setActiveArrival(null);
    }
  };

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(false);

  const handleSave = () => {
    setShowConfirm(true);
  };

  const confirmSave = () => {
    pendingChanges.forEach(({ studentId, status }) => {
      markAttendance.mutate({
        studentId,
        date: todayStr,
        status: status !== null ? status : initialStatus[studentId],
        notes: notes[studentId] || undefined,
        arrivalTime: arrivalTimes[studentId] || undefined,
      });
    });
    setShowConfirm(false);
    setInitialStatus(selectedStatus);
    setInitialNotes(notes);
    setInitialArrivalTimes(arrivalTimes);
  };

  const cancelSave = () => {
    setShowConfirm(false);
  };

  const handleNavigate = () => {
    if (pendingChanges.length > 0) {
      setShowLeaveConfirm(true);
      setPendingNavigation(true);
    } else {
      navigate("/attendance");
    }
  };

  const confirmLeave = () => {
    setShowLeaveConfirm(false);
    setPendingNavigation(false);
    navigate("/attendance");
  };

  const cancelLeave = () => {
    setShowLeaveConfirm(false);
    setPendingNavigation(false);
  };

  return (
    <div className="space-y-8 p-8 min-h-screen">
      <div className="flex gap-5 justify-between items-center mb-6">
        <h1 className="flex-1 text-3xl font-extrabold text-right text-black drop-shadow">
          تسجيل حضور اليوم
        </h1>
        <Button
          variant="default"
          className="px-6 py-2"
          disabled={pendingChanges.length === 0}
          onClick={handleSave}
        >
          حفظ التغييرات
        </Button>
        <Button
          variant="outline"
          className="px-4 py-2"
          onClick={handleNavigate}
        >
          رجوع
        </Button>
      </div>
      <div className="mb-4 w-full justify-end">
        <Input
          type="text"
          placeholder="ابحث باسم الطالب..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {todayAttendance
          .filter((student) =>
            student.studentName.toLowerCase().includes(search.toLowerCase())
          )
          .map((student) => {
            const status = selectedStatus[student.studentId] ?? 3;
            let headerBg = "bg-gray-100";
            if (status === 1) headerBg = "bg-primary/20";
            else if (status === 3) headerBg = "bg-warning/20";
            else if (status === 2) headerBg = "bg-destructive/20";
            return (
              <Card
                key={student.studentId}
                className="shadow-lg hover:shadow-2xl transition-shadow duration-200 border-2"
              >
                <CardHeader
                  className={`${headerBg} rounded-t-xl flex items-center justify-between`}
                >
                  <CardTitle className="text-lg font-semibold text-black text-center flex-1">
                    {student.studentName}
                  </CardTitle>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="ml-2 p-2 rounded-full hover:bg-gray-200"
                      onClick={() => setActiveNote(student.studentId)}
                      title="إضافة ملاحظة"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    {status === 3 && (
                      <button
                        type="button"
                        className={`ml-2 p-2 rounded-full cursor-pointer border border-warning shadow-sm transition-colors duration-150 ${
                          activeArrival === student.studentId
                            ? "bg-warning/80 text-white ring-2 ring-warning"
                            : "bg-warning/30 hover:bg-warning/50 text-warning-dark"
                        }`}
                        onClick={() => setActiveArrival(student.studentId)}
                        title="يجب تحديد وقت الوصول عند التأخير"
                      >
                        <ClockArrowUp className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 justify-center py-4">
                  {activeNote === student.studentId && (
                    <div className="mb-2 flex flex-col gap-2">
                      <textarea
                        className="border rounded-md p-2 w-full text-sm"
                        rows={2}
                        placeholder="أدخل ملاحظة..."
                        value={notes[student.studentId] || ""}
                        onChange={(e) =>
                          setNotes((n) => ({
                            ...n,
                            [student.studentId]: e.target.value,
                          }))
                        }
                      />
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" onClick={() => setActiveNote(null)}>
                          حفظ
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setActiveNote(null)}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  )}
                  {activeArrival === student.studentId && (
                    <div className="mb-2 flex flex-col gap-2">
                      <input
                        type="time"
                        className="border rounded-md p-2 w-full text-sm"
                        value={arrivalTimes[student.studentId] || ""}
                        onChange={(e) =>
                          setArrivalTimes((prev) => ({
                            ...prev,
                            [student.studentId]: e.target.value,
                          }))
                        }
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          onClick={() => setActiveArrival(null)}
                        >
                          حفظ
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setActiveArrival(null)}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => handleMark(student.studentId, 1)}
                      className={`bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-lg shadow-md transition-colors duration-150 border-2 border-transparent 
                          ${
                            status === 1
                              ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/40"
                              : "hover:bg-gray-300"
                          } 
                        `}
                    >
                      حاضر
                    </Button>
                    <Button
                      onClick={() => handleMark(student.studentId, 3)}
                      className={`bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-lg shadow-md transition-colors duration-150 border-2 border-transparent 
                          ${
                            status === 3
                              ? "bg-warning text-warning-foreground border-warning ring-2 ring-warning/40"
                              : "hover:bg-gray-300"
                          } 
                        `}
                    >
                      متأخر
                    </Button>
                    <Button
                      onClick={() => handleMark(student.studentId, 2)}
                      className={`bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-lg shadow-md transition-colors duration-150 border-2 border-transparent 
                          ${
                            status === 2
                              ? "bg-destructive text-destructive-foreground border-destructive ring-2 ring-destructive/40"
                              : "hover:bg-gray-300"
                          } 
                        `}
                    >
                      غائب
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">تأكيد الحفظ</h2>
            <p className="mb-6">هل أنت متأكد من حفظ التغييرات؟</p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" onClick={confirmSave}>
                نعم، احفظ
              </Button>
              <Button variant="outline" onClick={cancelSave}>
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
      {showLeaveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">تأكيد الخروج</h2>
            <p className="mb-6">
              لديك تغييرات غير محفوظة. هل تريد المتابعة بدون حفظ؟
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" onClick={confirmLeave}>
                نعم، اخرج
              </Button>
              <Button variant="outline" onClick={cancelLeave}>
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
