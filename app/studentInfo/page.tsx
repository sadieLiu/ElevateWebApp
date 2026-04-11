/* This is the student info page */
'use client';
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import InfoCard from "../components/InfoCard";
import StudentPicker from "../components/StudentPicker";

const students = [
  { name: "Alex Johnson", birthday: "March 12, 2008", school: "Sunrise High School", gradeLevel: "11th Grade", location: "Elevate Online",  parent: "Kylie Johnson", contact:"kyliejohnson@gmail.com" },
  { name: "Maria Lopez", birthday: "June 5, 2007", school: "Westview Academy", gradeLevel: "12th Grade", location: "Elevate Edu", parent: "Pedro Lopez", contact:"(123) 456-7890"},
  { name: "Scarlet Rivera", birthday: "January 5, 2007", school: "Mountain View High School", gradeLevel: "12th Grade", location: "Elevate Prep",parent: "Cecelia Rivera", contact:"(123) 456-7890" },
];

const StudentInfoPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>({});
  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
  fetch("http://localhost:5000/api/students")
    .then((res) => res.json())
    .then((data) => {
  console.log(data);
  setStudentsData(data);
  if (data.length > 0) {
    setSelectedStudent(data[0]);
  }
})
    .catch((err) => console.error(err));
}, []);

  return (
    <Container maxWidth="sm" style={styles.wrapper}>
      <div>
        <StudentPicker
            students={studentsData}
            selected={selectedStudent}
            onSelect={setSelectedStudent}
        />
        {selectedStudent && (
  <InfoCard
    name={selectedStudent.name}
birthday={selectedStudent.birthday}
school={selectedStudent.school}
gradeLevel={selectedStudent.grade}
location={selectedStudent.location}
parent={selectedStudent.parentName}
contact={selectedStudent.parentEmail}
  />
)}
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





