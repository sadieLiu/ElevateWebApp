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
  student: string;
  tutor: string;
  notes: string;
  start: Date;
  end: Date;
}

export default function TutorCalendar({ allowScheduling = false }) {
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: "Math Tutoring",
      student: "Test Student",
      tutor: "Test Tutor",
      notes: "Sample session",
      start: new Date(2026, 1, 17, 10, 0),
      end: new Date(2026, 1, 17, 11, 0),
    },
    {
      id: 2,
      title: "Science Tutoring",
      student: "Test Student",
      tutor: "Test Tutor",
      notes: "Sample session",
      start: new Date(2026, 1, 18, 11, 0),
      end: new Date(2026, 1, 18, 12, 0),
    },
  ]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/sessions")
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((session: any) => ({
          id: session.sessionId,
          title: session.subjects,
          student: "Student",
          tutor: "Tutor",
          notes: "",
          start: new Date(session.startDateTime + " UTC"),
          end: new Date(session.endDateTime + " UTC"),
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [title, setTitle] = useState("");
  const [student, setStudent] = useState("");
  const [tutor, setTutor] = useState("");
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
            <TextField
              autoFocus
              margin="dense"
              label="Session Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              margin="dense"
              label="Student Name"
              fullWidth
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            />

            <TextField
              margin="dense"
              label="Tutor Name"
              fullWidth
              value={tutor}
              onChange={(e) => setTutor(e.target.value)}
            />

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
        }).then(() => {
          window.location.reload();
        });
      } else {
        fetch("http://127.0.0.1:5000/api/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tutorId: 1,
            subjects: title,
            startDateTime: selectedSlot.start.toISOString().slice(0, 19).replace("T", " "),
            endDateTime: selectedSlot.end.toISOString().slice(0, 19).replace("T", " "),
            location: "online",
          }),
        }).then(() => {
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