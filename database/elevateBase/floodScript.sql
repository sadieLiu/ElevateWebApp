USE elevateBase;

INSERT INTO User (userName, passwordHash, role) 
VALUES ('MarkMoore', 'kldna3dsad4', 'student');

INSERT INTO Student (studentId, name, birthday, grade, school, location, parentName, parentPhone, parentEmail) 
VALUES (1, 'Mark Moore', '2020-12-03', 'kinder', 'Carver Elementry', 'edu', 'Lacy Moore', '6266116162', 'lacymmoore@gmail.com');

INSERT INTO User (userName, passwordHash, role) 
VALUES ('KayleyKent', 'kldsddaws4', 'admin');

INSERT INTO Tutor (tutorId, isAdmin, name, birthday, subjects, availability) 
VALUES (2, TRUE, 'Kayley Kent', '2001-05-13', 'Math', 'Mon 7am-9pm & Tues 2pm -9pm');

INSERT INTO User (userName, passwordHash, role) 
VALUES ('MarisolStone', 'kldsdw2f', 'tutor');

INSERT INTO Tutor (tutorId, isAdmin, name, birthday, subjects, availability) 
VALUES (3, FALSE, 'Marisole Stone', '2002-09-23', 'English', 'Mon 8am-8pm & Fri 3pm -8pm');