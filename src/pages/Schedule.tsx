import { useState } from "react";
import { useClassrooms } from "@/api/classrooms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, X } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";
import {
  useClassSessions,
  useCreateClassSession,
  useUpdateClassSession,
  ApiClassSession,
  ClassSessionCreateDto,
  ClassSessionUpdateDto,
  useDeleteClassSession,
  useClassSessionsByClassroomId,
} from "@/api/classSessions";
import SessionForm from "@/components/class_session/SessionForm";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<ApiClassSession | null>(
    null
  );
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");

  const { data: classrooms, isLoading: isLoadingClassrooms } = useClassrooms();
  const { data: filteredSessions, isLoading: isLoadingFiltered } =
    useClassSessionsByClassroomId(selectedClassroom);
  const { data: classSessions, isLoading: isLoadingAll } = useClassSessions();
  const createSession = useCreateClassSession();
  const updateSession = useUpdateClassSession();
  const deleteSessionMutation = useDeleteClassSession();

  // Use filtered sessions if a classroom is selected, otherwise all
  const sessions = selectedClassroom ? filteredSessions : classSessions;
  const isLoading = selectedClassroom ? isLoadingFiltered : isLoadingAll;

  // Generate a color for each classroom (or subject/teacher if you prefer)
  const colorPalette = [
    "#2563eb", // blue-600
    "#16a34a", // green-600
    "#f59e42", // orange-400
    "#e11d48", // rose-600
    "#a21caf", // purple-700
    "#facc15", // yellow-400
    "#0ea5e9", // sky-500
    "#f43f5e", // pink-500
    "#10b981", // emerald-500
    "#fbbf24", // amber-400
  ];

  // Map classroomId to a color (use all classrooms for stable color mapping)
  const classroomColorMap: Record<string, string> = {};
  let colorIdx = 0;
  classrooms?.forEach((c) => {
    if (c.id && !classroomColorMap[c.id]) {
      classroomColorMap[c.id] = colorPalette[colorIdx % colorPalette.length];
      colorIdx++;
    }
  });

  // When filtering by classroom, color by subject for distinction
  const subjectColorMap: Record<string, string> = {};
  let subjectColorIdx = 0;
  sessions?.forEach((s) => {
    if (s.subjectId && !subjectColorMap[s.subjectId]) {
      subjectColorMap[s.subjectId] =
        colorPalette[subjectColorIdx % colorPalette.length];
      subjectColorIdx++;
    }
  });

  const events =
    sessions?.map((session) => {
      let backgroundColor = "#2563eb";
      let borderColor = "#2563eb";
      if (selectedClassroom) {
        // When filtering, color by subject
        if (session.subjectId && subjectColorMap[session.subjectId]) {
          backgroundColor = subjectColorMap[session.subjectId];
          borderColor = subjectColorMap[session.subjectId];
        }
      } else {
        // When not filtering, color by classroom
        if (session.classroomId && classroomColorMap[session.classroomId]) {
          backgroundColor = classroomColorMap[session.classroomId];
          borderColor = classroomColorMap[session.classroomId];
        }
      }
      return {
        title: `${session.subjectName} - ${session.teacherName}`,
        start: session.startTime,
        end: session.endTime,
        backgroundColor,
        borderColor,
        textColor: "#fff",
      };
    }) ?? [];

  const openAddModal = () => {
    setEditingSession(null);
    setModalOpen(true);
  };

  const openEditModal = (session: ApiClassSession) => {
    setEditingSession(session);
    setModalOpen(true);
  };

  const handleSubmit = (
    data: ClassSessionCreateDto | ClassSessionUpdateDto
  ) => {
    if ("id" in data) {
      updateSession.mutate(data as ClassSessionUpdateDto, {
        onSuccess: () => setModalOpen(false),
      });
    } else {
      createSession.mutate(data as ClassSessionCreateDto, {
        onSuccess: () => setModalOpen(false),
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteSessionMutation.mutate(id, {
      onSuccess: () => {
        setModalOpen(false); // close modal after deletion
      },
    });
  };

  if (isLoading || isLoadingClassrooms) return <div>جاري تحميل الجدول...</div>;

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-arabic">
              الجدول الدراسي
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة الجداول والمواعيد
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <select
              className="border rounded px-3 py-2 font-arabic bg-background text-foreground"
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
            >
              <option value="">كل الصفوف</option>
              {classrooms?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button className="font-arabic" onClick={openAddModal}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة حصة جديدة
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full text-start"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="font-arabic">
              الفعاليات
            </TabsTrigger>
            <TabsTrigger value="weekly" className="font-arabic">
              الجدول الأسبوعي
            </TabsTrigger>
          </TabsList>

          {/* Weekly Schedule */}
          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">الجدول الأسبوعي</CardTitle>
                <CardDescription>عرض الحصص لكل أيام الأسبوع</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <FullCalendar
                  plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  direction="rtl"
                  locales={[arLocale]}
                  locale="ar"
                  allDaySlot={false}
                  slotMinTime="07:00:00"
                  slotMaxTime="15:00:00"
                  height="auto"
                  events={events}
                  nowIndicator={true}
                  dayHeaderFormat={{ weekday: "long" }}
                  slotLabelFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: false,
                  }}
                  headerToolbar={{
                    start: "prev,next today",
                    center: "title",
                    end: "timeGridWeek,dayGridMonth",
                  }}
                  buttonText={{
                    today: "اليوم",
                    week: "الأسبوع",
                    month: "الشهر",
                  }}
                  eventClick={(info) => {
                    const clickedSession = sessions?.find(
                      (s) =>
                        s.subjectName + " - " + s.teacherName ===
                        info.event.title
                    );
                    if (clickedSession) openEditModal(clickedSession);
                  }}
                  eventClassNames={(arg) => {
                    // Remove bg-primary, use calendar event color
                    return "rounded-md shadow-sm px-2 py-1 cursor-pointer border-2 border-white";
                  }}
                  slotEventOverlap={false}
                  slotLaneClassNames={(slotInfo) => {
                    // Highlight current hour slot
                    const now = new Date();
                    const slotDate = new Date(slotInfo.date);
                    if (
                      now.getFullYear() === slotDate.getFullYear() &&
                      now.getMonth() === slotDate.getMonth() &&
                      now.getDate() === slotDate.getDate() &&
                      now.getHours() === slotDate.getHours()
                    ) {
                      return "bg-yellow-100";
                    }
                    return "";
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Events */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-4">
              {sessions?.map((session) => (
                <Card
                  key={session.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium font-arabic">
                            {session.subjectName} - {session.teacherName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.startTime).toLocaleDateString(
                              "ar-EG"
                            )}{" "}
                            -{" "}
                            {new Date(session.startTime).toLocaleTimeString(
                              "ar-EG",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-arabic">
                        حصة
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )) || <div>لا توجد فعاليات قادمة.</div>}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal for Add/Edit Session */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-arabic">
                {editingSession ? "تعديل الحصة" : "إضافة حصة جديدة"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {/* Form */}
            <SessionForm
              session={editingSession}
              onSubmit={handleSubmit}
              onCancel={() => setModalOpen(false)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Schedule;
