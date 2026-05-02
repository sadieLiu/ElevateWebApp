/* This component works with the student info card component on the student info page */
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
  selected: Student | null;
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
      <option value="" disabled>
        Select a student
      </option>

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
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    width: "100%",
    border: "2px solid secondary.dark",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.3s",
    marginBottom: "20px",
    boxShadow: '5'
  },
};

export default StudentDropdown;


