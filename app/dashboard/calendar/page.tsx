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
  start: Date;
  end: Date;
}

export default function TutorCalendar() {
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: "Math Tutoring",
      start: new Date(2026, 1, 17, 10, 0),
      end: new Date(2026, 1, 17, 11, 0),
    },
    {
      id: 2,
      title: "Science Tutoring",
      start: new Date(2026, 1, 18, 11, 0),
      end: new Date(2026, 1, 18, 12, 0),
    },
  ]);

const [open, setOpen] = useState(false);
const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
const [title, setTitle] = useState("");

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
            selectable
            onSelectSlot={(slotInfo) => {
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
          <DialogTitle>Add Tutoring Session</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Session Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => {
                if (selectedSlot && title) {
                  const newEvent = {
                    id: events.length + 1,
                    title,
                    start: selectedSlot.start,
                    end: selectedSlot.end,
                  };

                  setEvents([...events, newEvent]);
                  setTitle("");
                  setSelectedSlot(null);
                  setOpen(false);
                }
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}