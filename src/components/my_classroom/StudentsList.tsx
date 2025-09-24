import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, MessageSquare } from "lucide-react";

interface Student {
  id: string;
  fullName: string;
  isActive: boolean;
  attendanceRate: number;
  parentFullName: string;
  parentPhone: string;
}

interface StudentsListProps {
  students: Student[];
  search: string;
  onSearchChange: (v: string) => void;
}

const StudentsList = ({
  students,
  search,
  onSearchChange,
}: StudentsListProps) => {
  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-4">
      <div className="relative">
        <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="ابحث عن طالب..."
          className="border rounded-lg w-full p-2 pr-8"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredStudents.length ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {student.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{student.fullName}</h3>
                    <Badge
                      variant={student.isActive ? "default" : "destructive"}
                    >
                      {student.isActive ? "حاضر" : "غائب"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    عرض
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  الحضور: {student.attendanceRate}%
                  <Progress
                    value={student.attendanceRate}
                    className="w-24 inline-block ml-2"
                  />
                </span>
                <span>ولي الأمر: {student.parentFullName}</span>
                <span>📞 {student.parentPhone}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-6">
            لا يوجد طلاب حالياً
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;
