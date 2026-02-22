import React from "react";

type Student = {
  name: string;
  birthday: string;
  school: string;
  gradeLevel: string;
  location: string;
parent: string;
  contact: string;
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
      value={selected.name}
      onChange={(e) => {
        const student = sorted.find(s => s.name === e.target.value);
        if (student) onSelect(student);
      }}
      style={styles.select}
    >
      {sorted.map((s) => (
        <option key={s.name} value={s.name}>
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


