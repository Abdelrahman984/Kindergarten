import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";

interface ClassroomInfoProps {
  name: string;
  studentsCount: number;
  capacity: number;
  schedule?: string;
  presentCount: number;
  attendanceRate: number;
}

const ClassroomInfo = ({
  name,
  studentsCount,
  capacity,
  schedule,
  presentCount,
  attendanceRate,
}: ClassroomInfoProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <h3 className="text-xl font-bold text-emerald-800 mb-2">{name}</h3>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>
                {studentsCount}/{capacity} طالب
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{schedule ?? "لا يوجد جدول"}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {presentCount}
                </div>
                <div className="text-sm text-gray-600">الحاضرون</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {attendanceRate}%
                </div>
                <div className="text-sm text-gray-600">نسبة الحضور</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ClassroomInfo;
