/* This is the student info page */
'use client';
import React, { useState } from "react";
import Container from "@mui/material/Container";
import InfoCard from "../components/InfoCard";
import StudentPicker from "../components/StudentPicker";

const students = [
  { name: "Alex Johnson", birthday: "March 12, 2008", school: "Sunrise High School", gradeLevel: "11th Grade", location: "Elevate Online",  parent: "Kylie Johnson", contact:"kyliejohnson@gmail.com" },
  { name: "Maria Lopez", birthday: "June 5, 2007", school: "Westview Academy", gradeLevel: "12th Grade", location: "Elevate Edu", parent: "Pedro Lopez", contact:"(123) 456-7890"},
  { name: "Scarlet Rivera", birthday: "January 5, 2007", school: "Mountain View High School", gradeLevel: "12th Grade", location: "Elevate Prep",parent: "Cecelia Rivera", contact:"(123) 456-7890" },
];

const StudentInfoPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  return (
    <Container maxWidth="sm" style={styles.wrapper}>
      <div>``
        <StudentPicker
            students={students}
            selected={selectedStudent}
            onSelect={setSelectedStudent}
        />
        <InfoCard
          name={selectedStudent.name}
          birthday={selectedStudent.birthday}
          school={selectedStudent.school}
          gradeLevel={selectedStudent.gradeLevel}
          location={selectedStudent.location}
          parent={selectedStudent.parent}
          contact={selectedStudent.contact}
        />
      </div>
    </Container>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center", // horizontal centering
    alignItems: "center",     // vertical centering
    height: "100vh",          // full screen height
  },
};

export default StudentInfoPage;





