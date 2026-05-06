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
  Stack,
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

/* const toLocalInputValue = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}; */

const toMySQLFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = "00";
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const timeOptions = [
  { value: "08:00", label: "8:00 AM" },
  { value: "08:30", label: "8:30 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "09:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
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

const setDateOnly = (originalDate: Date, newDateString: string) => {
  const [year, month, day] = newDateString.split("-").map(Number);
  const updated = new Date(originalDate);
  updated.setFullYear(year, month - 1, day);
  return updated;
};

const inputStyle = {
  backgroundColor: "#e8f0fe",
  borderRadius: 1,
  "& .MuiInputBase-input": { color: "rgba(0, 0, 0, 0.87)" },
  "& .MuiInputLabel-root": { color: "rgba(0, 0, 0, 0.6)" },
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
  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
    <Button
      variant="contained"
      onClick={() => {
        setIsEditing(false);
        setSelectedEvent(null);
        setTitle("");
        setStudent("");
        setTutor("");
        setNotes("");

        const defaultStart = new Date();
        defaultStart.setHours(8,0,0,0);
        defaultStart.setMinutes(0, 0, 0);

        const defaultEnd = new Date(defaultStart);
        defaultEnd.setHours(9,0,0,0);

        setSelectedSlot({
          start: defaultStart,
          end: defaultEnd,
        });
        setOpen(true);
      }}
    >
      Add Session
    </Button>
  </Box>
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
            min={new Date(0, 0, 0, 8, 0, 0)} // start at 8:00 AM
            max={new Date(0, 0, 0, 21, 0, 0)} // 9:00 PM
            onSelectEvent={(event) => {
              setSelectedEvent(event);
              setIsEditing(allowScheduling);
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

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            {isEditing ? "Edit Tutoring Session" : "Add Tutoring Session"}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2}>


              {selectedSlot && (
                <Box sx={{ mb: 2 }}>
                  <Typography>Start: {selectedSlot.start.toLocaleString()}</Typography>
                  <Typography>End: {selectedSlot.end.toLocaleString()}</Typography>
                </Box>
              )}

              <TextField
                label="Session Date"
                type="date"
                fullWidth
                disabled={!allowScheduling}
                value={selectedSlot ? selectedSlot.start.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  if (!selectedSlot) return;
                  const newStart = setDateOnly(selectedSlot.start, e.target.value);
                  const duration = selectedSlot.end.getTime() - selectedSlot.start.getTime();
                  setSelectedSlot({
                    start: newStart,
                    end: new Date(newStart.getTime() + duration)
                  });
                }}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={
                  inputStyle
                }
              />


              <FormControl
                  fullWidth
                  margin="dense"
                  sx={inputStyle}
                >
                <InputLabel>Start Time</InputLabel>
                <Select
                  disabled={!allowScheduling}
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
                   <MenuItem key={time.value} value={time.value}>
                    {time.label}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>

              <FormControl
                  fullWidth
                  margin="dense"
                  sx={inputStyle}
                >
                <InputLabel>End Time</InputLabel>
                <Select
                  disabled={!allowScheduling}
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
                    <MenuItem key={time.value} value={time.value}>
                      {time.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Session Title"
                fullWidth
                disabled={!allowScheduling}
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  sx={inputStyle}
                />

              <FormControl
                  fullWidth
                  sx={inputStyle}
                >
                  <InputLabel id="student-label">Student</InputLabel>
                  <Select
                    disabled={!allowScheduling}
                    labelId="student-label"
                    label="Student"
                    value={student}
                    onChange={(e)=>setStudent(Number(e.target.value))}
                  >
                    {students.map((s:any)=>(
                      <MenuItem key={s.studentId} value={s.studentId}>{s.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

              <FormControl
              fullWidth
              sx={inputStyle}
            >
              <InputLabel id="tutor-label">Tutor</InputLabel>
              <Select
                disabled={!allowScheduling}
                labelId="tutor-label"
                label="Tutor"
                value={tutor}
                onChange={(e)=>setTutor(Number(e.target.value))}
              >
                {tutors.map((t:any)=>(
                  <MenuItem key={t.tutorId} value={t.tutorId}>{t.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

              <TextField
                label="Notes"
                fullWidth
                multiline
                disabled={!allowScheduling}
                value={notes}
                onChange={(e)=>setNotes(e.target.value)}
                sx={inputStyle}
              />
            </Stack>
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