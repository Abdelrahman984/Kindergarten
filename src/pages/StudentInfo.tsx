import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "@/api/students";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SkeletonLoading from "@/components/SkeletonLoading";

const StudentInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: apiStudents = [] } = useStudents();
  const student = apiStudents.find((s) => s.id === id);

  if (apiStudents.length === 0) {
    return <SkeletonLoading />;
  }

  if (!student) {
    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>الطالب غير موجود</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate(-1)}>رجوع</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>{student.fullName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          العمر:{" "}
          {new Date().getFullYear() -
            new Date(student.dateOfBirth).getFullYear()}{" "}
          سنوات
        </p>
        <p>الهاتف: {student.parentPhone}</p>
        <p>العنوان: {student.address}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          رجوع
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudentInfo;
