import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Session {
  id: string;
  subjectName?: string;
  startTime?: string;
  endTime?: string;
}

interface TodayScheduleProps {
  sessions: Session[];
}

const TodaySchedule = ({ sessions }: TodayScheduleProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        جدول اليوم
      </CardTitle>
    </CardHeader>
    <CardContent>
      {sessions.length ? (
        <div className="space-y-3 ">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center p-2 bg-emerald-50 rounded"
            >
              <span className="font-medium">
                {s.subjectName ?? "مادة غير معروفة"}
              </span>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                {s.startTime
                  ? new Date(s.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "--:--"}
                <span className="mx-1 text-emerald-400">-</span>
                {s.endTime
                  ? new Date(s.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "--:--"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-6">لا يوجد حصص اليوم</div>
      )}
    </CardContent>
  </Card>
);

export default TodaySchedule;
