"use client";

import { useState, useEffect } from "react";
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

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const parseMySQLDate = (value: string) => {
  const date = new Date(value);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

const toLocalInputValue = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};

const toMySQLFormat = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 19).replace("T", " ");
};

const timeOptions = [
  "08:00","08:30","09:00","09:30","10:00","10:30",
  "11:00","11:30","12:00","12:30","13:00","13:30",
  "14:00","14:30","15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30","19:00","19:30","20:00",
];

const getTimeValue = (date: Date) => {
  return `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}`;
};

const setTimeOnDate = (date: Date, time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const updated = new Date(date);
  updated.setHours(hour, minute, 0, 0);
  return updated;
};

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
  const [events, setEvents] = useState<EventType[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [title, setTitle] = useState("");
  const [student, setStudent] = useState<number | "">("");
  const [tutor, setTutor] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/sessions")
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((session: any) => ({
          id: session.sessionId,
          title: session.subjects,
          student: session.studentId,
          tutor: session.tutorId,
          notes: session.notes,
          start: parseMySQLDate(session.startDateTime),
          end: parseMySQLDate(session.endDateTime),
        }));
        setEvents(formattedEvents);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/students")
      .then((res) => res.json())
      .then(setStudents);

    fetch("http://127.0.0.1:5000/api/tutors")
      .then((res) => res.json())
      .then(setTutors);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4">Tutoring Schedule</Typography>

        {allowScheduling && (
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              setIsEditing(false);
              setSelectedEvent(null);
              setTitle("");
              setStudent("");
              setTutor("");
              setNotes("");
              setSelectedSlot({
                start: new Date(),
                end: new Date(new Date().getTime() + 60*60*1000),
              });
              setOpen(true);
            }}
          >
            Add Session
          </Button>
        )}

        <Paper sx={{ height: 600, p: 2 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={allowScheduling}
            step={30}
            timeslots={2}
            onSelectEvent={(event) => {
              if (!allowScheduling) return;
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
              setIsEditing(false);
              setSelectedEvent(null);
              setTitle("");
              setStudent("");
              setTutor("");
              setNotes("");
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

        <Dialog open={open && allowScheduling} onClose={() => setOpen(false)}>
          <DialogTitle>
            {isEditing ? "Edit Tutoring Session" : "Add Tutoring Session"}
          </DialogTitle>

          <DialogContent>
            {selectedSlot && (
              <Box sx={{ mb: 2 }}>
                <Typography>Start: {selectedSlot.start.toLocaleString()}</Typography>
                <Typography>End: {selectedSlot.end.toLocaleString()}</Typography>
              </Box>
            )}

            <FormControl fullWidth margin="dense">
              <InputLabel>Start Time</InputLabel>
              <Select
                value={selectedSlot ? getTimeValue(selectedSlot.start) : ""}
                label="Start Time"
                onChange={(e) => {
                  if (!selectedSlot) return;
                  setSelectedSlot((prev) =>
                    prev ? { ...prev, start: setTimeOnDate(prev.start, e.target.value) } : null
                  );
                }}
              >
                {timeOptions.map((time) => (
                  <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel>End Time</InputLabel>
              <Select
                value={selectedSlot ? getTimeValue(selectedSlot.end) : ""}
                label="End Time"
                onChange={(e) => {
                  if (!selectedSlot) return;
                  setSelectedSlot((prev) =>
                    prev ? { ...prev, end: setTimeOnDate(prev.end, e.target.value) } : null
                  );
                }}
              >
                {timeOptions.map((time) => (
                  <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Session Title" fullWidth value={title} onChange={(e)=>setTitle(e.target.value)} />

            <FormControl fullWidth>
              <InputLabel>Student</InputLabel>
              <Select value={student} onChange={(e)=>setStudent(Number(e.target.value))}>
                {students.map((s:any)=>(
                  <MenuItem key={s.studentId} value={s.studentId}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Tutor</InputLabel>
              <Select value={tutor} onChange={(e)=>setTutor(Number(e.target.value))}>
                {tutors.map((t:any)=>(
                  <MenuItem key={t.tutorId} value={t.tutorId}>{t.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Notes" fullWidth multiline value={notes} onChange={(e)=>setNotes(e.target.value)} />
          </DialogContent>

          <DialogActions>
            <Button onClick={()=>setOpen(false)}>Cancel</Button>

            {allowScheduling && (
              <>
                {isEditing && selectedEvent && (
                  <Button
                    color="error"
                    onClick={()=>{
                      fetch(`http://127.0.0.1:5000/api/sessions/${selectedEvent.id}`,{
                        method:"DELETE",
                      }).then(()=>window.location.reload());
                    }}
                  >
                    Delete
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={()=>{
                    if(!selectedSlot || !title) return;

                    const start = selectedSlot.start;
                    const end = selectedSlot.end;

                    if(start.getHours()<8 || end.getHours()>20){
                      alert("Sessions must be between 8 AM and 8 PM");
                      return;
                    }

                    const validMinutes=[0,30];
                    if(!validMinutes.includes(start.getMinutes()) || !validMinutes.includes(end.getMinutes())){
                      alert("Time must be in 30-minute intervals");
                      return;
                    }

                    if(isEditing && selectedEvent){
                      fetch(`http://127.0.0.1:5000/api/sessions/${selectedEvent.id}`,{
                        method:"PUT",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({
                          tutorId:tutor,
                          studentId:student||null,
                          subjects:title,
                          startDateTime:toMySQLFormat(start),
                          endDateTime:toMySQLFormat(end),
                          location:"online",
                          notes:notes,
                        }),
                      }).then(async (res) => {
                        const data = await res.json();

                        if (!res.ok) {
                          alert(data.message);
                          return;
                        }

                        window.location.reload();
                      });
                    } else {
                      fetch("http://127.0.0.1:5000/api/sessions",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({
                          tutorId:tutor,
                          studentId:student||null,
                          subjects:title,
                          startDateTime:toMySQLFormat(start),
                          endDateTime:toMySQLFormat(end),
                          location:"online",
                          notes:notes,
                        }),
                      }).then(async (res) => {
                        const data = await res.json();

                        if (!res.ok) {
                          alert(data.message);
                          return;
                        }

                        window.location.reload();
                      });
                    }
                  }}
                >
                  {isEditing ? "Save" : "Add"}
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}