"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface EventType {
  id: number;
  title: string;
  student: number | "";
tutor: number | "";
  notes: string;
  start: Date;
  end: Date;
}

export default function TutorCalendar({ allowScheduling = false }) {
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: "Math Tutoring",
      student: "",
tutor: "",
      notes: "Sample session",
      start: new Date(2026, 1, 17, 10, 0),
      end: new Date(2026, 1, 17, 11, 0),
    },
    {
      id: 2,
      title: "Science Tutoring",
      student: "",
tutor: "",
      notes: "Sample session",
      start: new Date(2026, 1, 18, 11, 0),
      end: new Date(2026, 1, 18, 12, 0),
    },
  ]);

const [students, setStudents] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/sessions")
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((session: any) => ({
  id: session.sessionId,
  title: session.subjects,
  student: "",
  tutor: session.tutorId,
          notes: "",
          start: new Date(session.startDateTime + " UTC"),
          end: new Date(session.endDateTime + " UTC"),
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
  fetch("http://127.0.0.1:5000/api/students")
    .then((res) => res.json())
    .then((data) => setStudents(data))
    .catch((err) => console.error(err));

  fetch("http://127.0.0.1:5000/api/tutors")
    .then((res) => res.json())
    .then((data) => setTutors(data))
    .catch((err) => console.error(err));
}, []);

  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [title, setTitle] = useState("");
  const [student, setStudent] = useState<number | "">("");
  const [tutor, setTutor] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Tutoring Schedule
        </Typography>

        <Paper sx={{ height: 600, p: 2 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={allowScheduling}
            onSelectEvent={(event) => {
              setSelectedEvent(event);
              setIsEditing(true);
              setTitle(event.title);
              setStudent(event.student);
              setTutor(event.tutor);
              setNotes(event.notes);
              setSelectedSlot({ start: event.start, end: event.end });
              setOpen(true);
            }}
            onSelectSlot={(slotInfo) => {
              if (!allowScheduling) return;

              setSelectedSlot({
                start: slotInfo.start,
                end: slotInfo.end,
              });
              setOpen(true);
            }}
            defaultView="week"
            style={{ height: "100%" }}
          />
        </Paper>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            {isEditing ? "Edit Tutoring Session" : "Add Tutoring Session"}
          </DialogTitle>

          <DialogContent>

{selectedSlot && (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2">
      Start: {selectedSlot.start.toLocaleString()}
    </Typography>
    <Typography variant="body2">
      End: {selectedSlot.end.toLocaleString()}
    </Typography>
  </Box>
)}


            <TextField
              autoFocus
              margin="dense"
              label="Session Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl fullWidth margin="dense">
  <InputLabel>Student</InputLabel>
  <Select
    value={student}
    label="Student"
    onChange={(e) => setStudent(Number(e.target.value))}
  >
    {students.map((s: any) => (
      <MenuItem key={s.studentId} value={s.studentId}>
        {s.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            <FormControl fullWidth margin="dense">
  <InputLabel>Tutor</InputLabel>
  <Select
    value={tutor}
    label="Tutor"
    onChange={(e) => setTutor(Number(e.target.value))}
  >
    {tutors.map((t: any) => (
      <MenuItem key={t.tutorId} value={t.tutorId}>
        {t.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            <TextField
              margin="dense"
              label="Notes"
              fullWidth
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
  <Button onClick={() => setOpen(false)}>Cancel</Button>
{isEditing && selectedEvent && (
    <Button
      color="error"
      onClick={() => {
        fetch(`http://127.0.0.1:5000/api/sessions/${selectedEvent.id}`, {
          method: "DELETE",
        }).then(() => {
          window.location.reload();
        });
      }}
    >
      Delete
    </Button>
  )}
  <Button
    variant="contained"
    onClick={() => {
      if (!selectedSlot || !title) return;

      if (isEditing && selectedEvent) {
        fetch(`http://127.0.0.1:5000/api/sessions/${selectedEvent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subjects: title,
            startDateTime: selectedSlot.start.toISOString().slice(0, 19).replace("T", " "),
            endDateTime: selectedSlot.end.toISOString().slice(0, 19).replace("T", " "),
            location: "online",
          }),
        }).then((res) => {
  if (!res.ok) {
    return res.json().then((data) => {
      alert(data.message);
    });
  }
  window.location.reload();
});
      } else {
        fetch("http://127.0.0.1:5000/api/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
  tutorId: tutor,
  studentId: student,
  subjects: title,
            startDateTime: selectedSlot.start.toISOString().slice(0, 19).replace("T", " "),
            endDateTime: selectedSlot.end.toISOString().slice(0, 19).replace("T", " "),
            location: "online",
          }),
        }).then((res) => {
  if (!res.ok) {
    return res.json().then((data) => {
      alert(data.message);
    });
  }
  window.location.reload();
});
      }

      setTitle("");
      setStudent("");
      setTutor("");
      setNotes("");
      setSelectedSlot(null);
      setSelectedEvent(null);
      setIsEditing(false);
      setOpen(false);
    }}
  >
    {isEditing ? "Save" : "Add"}
  </Button>
</DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}