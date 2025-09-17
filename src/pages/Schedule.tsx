import { useState } from "react";
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
import { Calendar, Plus } from "lucide-react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";

const Schedule = () => {
  const [activeSection, setActiveSection] = useState("schedule");
  const userRole = "admin" as const;

  const events = [
    {
      title: "القرآن الكريم - أ. فاطمة",
      start: "2025-09-14T08:00:00",
      end: "2025-09-14T09:00:00",
    },
    {
      title: "رياضيات - أ. عائشة",
      start: "2025-09-14T09:00:00",
      end: "2025-09-14T10:00:00",
    },
    {
      title: "اللغة العربية - أ. خديجة",
      start: "2025-09-14T10:30:00",
      end: "2025-09-14T11:30:00",
    },
    {
      title: "الأنشطة الفنية - أ. زينب",
      start: "2025-09-14T11:30:00",
      end: "2025-09-14T12:30:00",
    },
    {
      title: "التربية الإسلامية - أ. مريم",
      start: "2025-09-15T08:00:00",
      end: "2025-09-15T09:00:00",
    },
    {
      title: "العلوم - أ. صفية",
      start: "2025-09-15T09:00:00",
      end: "2025-09-15T10:00:00",
    },
    {
      title: "اللغة الإنجليزية - أ. عائشة",
      start: "2025-09-15T10:30:00",
      end: "2025-09-15T11:30:00",
    },
    {
      title: "الرياضة - أ. خولة",
      start: "2025-09-15T11:30:00",
      end: "2025-09-15T12:30:00",
    },
  ];

  const upcomingEvents = [
    {
      date: "2025-09-20",
      title: "يوم مفتوح للآباء",
      type: "فعالية",
      time: "10:00 ص",
    },
    {
      date: "2025-09-22",
      title: "مسابقة تحفيظ القرآن",
      type: "مسابقة",
      time: "9:00 ص",
    },
    { date: "2025-09-25", title: "رحلة تعليمية", type: "رحلة", time: "8:00 ص" },
    {
      date: "2025-09-28",
      title: "حفل تكريم المتفوقين",
      type: "حفل",
      time: "11:00 ص",
    },
  ];

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-arabic">
              الجدول الدراسي
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة الجداول والمواعيد
            </p>
          </div>
          <Button className="font-arabic">
            <Plus className="w-4 h-4 ml-2" />
            إضافة حصة جديدة
          </Button>
        </div>

        <Tabs defaultValue="weekly" className="w-full text-start">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="font-arabic">
              الفعاليات
            </TabsTrigger>

            <TabsTrigger value="weekly" className="font-arabic">
              الجدول الأسبوعي
            </TabsTrigger>
          </TabsList>

          {/* الجدول الأسبوعي */}
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
                  slotMinTime="08:00:00"
                  slotMaxTime="15:00:00"
                  height="auto"
                  events={events}
                  dayHeaderFormat={{ weekday: "long" }} // الأيام كاملة
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
                  eventClassNames={() =>
                    "bg-primary text-white rounded-md shadow-sm px-2 py-1"
                  }
                  slotEventOverlap={false}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* الفعاليات */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium font-arabic">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date} - {event.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-arabic">
                        {event.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Schedule;
