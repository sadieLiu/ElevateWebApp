CREATE DATABASE elevateBase;

USE elevateBase;
CREATE TABLE User (
    userId          INT PRIMARY KEY AUTO_INCREMENT,
    userName        VARCHAR(255) UNIQUE NOT NULL,               
    passwordHash   VARCHAR(255) NOT NULL,
    role            ENUM('student', 'tutor', 'admin') NOT NULL
);

CREATE TABLE Tutor (
    tutorId         INT PRIMARY KEY,
    isAdmin         BOOLEAN DEFAULT FALSE,
    name            VARCHAR(255) NOT NULL,
    birthday        DATE,
    subjects        VARCHAR(255), 
    availability    TEXT,                             
    FOREIGN KEY (tutorId) REFERENCES User(userId)
);

CREATE TABLE TutorAvailability (
    availabilityId  INT PRIMARY KEY AUTO_INCREMENT,     
    tutorId         INT NOT NULL,
    day             ENUM ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'),         
    startTime       TIME NOT NULL,
    endTime         TIME NOT NULL,
    startDateTime   DATETIME NOT NULL,
    endDateTime     DATETIME NOT NULL,
    FOREIGN KEY (tutorId) REFERENCES Tutor (tutorId)
);

CREATE TABLE Student (
    studentId       INT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    birthday        DATE,
    grade           ENUM('kinder', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th') ,
    school          TEXT,
    location        ENUM('edu', 'prep', 'bridge', 'online'),
    parentName      VARCHAR(255) NOT NULL,
    parentPhone     VARCHAR(20),
    parentEmail     VARCHAR(255),    
    FOREIGN KEY (studentId) REFERENCES User(userId)
);

CREATE TABLE Session (
    sessionId       INT PRIMARY KEY,
    tutorId         INT NOT NULL,
    subjects        VARCHAR(255),                               
    startDateTime   DATETIME NOT NULL,
    endDateTime     DATETIME NOT NULL,
    location        ENUM('edu', 'prep', 'bridge', 'online')
);

CREATE TABLE SessionReport(
    sessionId       INT NOT NULL,
    studentId       INT NOT NULL,
    attendance      ENUM('unrecorded', 'present', 'absent', 'excused') DEFAULT 'unrecorded',
    notes           TEXT,
    PRIMARY KEY (sessionId, studentId),
    FOREIGN KEY (sessionId) REFERENCES Session (sessionId),
    FOREIGN KEY (studentId) REFERENCES Student (studentId)
);

