'use client';

import TutorCalendar from "../../calendar/page";
import { useAuth } from "../../context/AuthContext";
import { Typography } from "@mui/material";

export default function AdminSchedule() {
  const { user } = useAuth();

  // allow scheduling if user is admin OR user is null (temporary demo)
  if (user && user.role !== "admin") {
    return <Typography>Only admins can access scheduling</Typography>;
  }

  return <TutorCalendar allowScheduling={true} />;
}