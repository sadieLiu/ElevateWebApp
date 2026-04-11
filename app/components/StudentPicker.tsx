import React from "react";

type Student = {
  studentId: number;
  name: string;
  birthday: string;
  school: string;
  grade: string;
  location: string;
  parentName: string;
  parentEmail: string;
};

type Props = {
  students: Student[];
  selected: Student;
  onSelect: (student: Student) => void;
};

const StudentDropdown: React.FC<Props> = ({ students, selected, onSelect }) => {
  const sorted = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (

    <select
      value={selected?.studentId || ""}
      onChange={(e) => {
        const student = sorted.find(s => s.studentId === Number(e.target.value));
        if (student) onSelect(student);
      }}
      style={styles.select}
    >
      {sorted.map((s) => (
        <option key={s.studentId} value={s.studentId}>
  {s.name}
</option>
      ))}
    </select>
  );
};

const styles = {
  select: {
    padding: "8px 12px",
    fontSize: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
};

export default StudentDropdown;


