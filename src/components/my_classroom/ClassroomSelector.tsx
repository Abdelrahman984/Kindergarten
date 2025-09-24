interface ClassroomSelectorProps {
  classrooms: { id: string; name: string }[];
  selectedClassroomId: string | null;
  onChange: (id: string) => void;
}

const ClassroomSelector = ({
  classrooms,
  selectedClassroomId,
  onChange,
}: ClassroomSelectorProps) => (
  <div className="flex gap-3 items-center">
    <span className="text-gray-700">اختر الفصل:</span>
    <select
      value={selectedClassroomId || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg p-2"
    >
      {classrooms.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  </div>
);

export default ClassroomSelector;
