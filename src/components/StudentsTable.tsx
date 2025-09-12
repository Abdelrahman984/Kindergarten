import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import { ApiClassroom } from "@/api/classrooms";
import { ApiStudent } from "@/api/students";

interface StudentsTableProps {
  students: ApiStudent[];
  classrooms: ApiClassroom[];
  handleEdit: (student: ApiStudent) => void;
  handleDelete: (student: ApiStudent) => void;
}

export default function StudentsTable({
  students,
  classrooms,
  handleEdit,
  handleDelete,
}: StudentsTableProps) {
  // ✅ Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ✅ Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [classroomFilter, setClassroomFilter] = useState("all");

  // Pagination handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ✅ Apply search & filter
  const filteredStudents = students?.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentPhone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClassroom =
      classroomFilter === "all" || s.classroomName === classroomFilter;

    return matchesSearch && matchesClassroom;
  });
  console.log("classrooms:", classrooms);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      {/* ✅ Search + Filter (RTL) */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label="بحث"
          placeholder="ابحث بالاسم أو ولي الأمر أو رقم الهاتف"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          label="الفصل"
          variant="outlined"
          size="small"
          value={classroomFilter}
          onChange={(e) => setClassroomFilter(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="all">الكل</MenuItem>
          {classrooms?.map((c) => (
            <MenuItem key={c.id} value={c.name}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* ✅ Table */}
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table
          stickyHeader
          sx={{
            "& .MuiTableCell-root": { textAlign: "center" },
            "& .MuiTableCell-head": {
              fontWeight: "bold",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>الاسم</TableCell>
              <TableCell>تاريخ الميلاد</TableCell>
              <TableCell>ولي الأمر</TableCell>
              <TableCell>رقم الهاتف</TableCell>
              <TableCell>العنوان</TableCell>
              <TableCell>الفصل</TableCell>
              <TableCell>إجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.dateOfBirth.split("T")[0]}</TableCell>
                  <TableCell>{student.parentFullName}</TableCell>
                  <TableCell>{student.parentPhone}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.classroomName}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(student)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(student)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredStudents?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="عدد الصفوف:"
        labelDisplayedRows={({ from, to, count }) =>
          `عرض ${from}-${to} من ${count}`
        }
        dir="rtl"
      />
    </Paper>
  );
}
