//dummy info cards for use in student/tutor info pages to be flooded with info through api database later on
'use client';
import React, { useState } from "react";
import InfoC from "react";
import {Box, Typography } from "@mui/material"

type InfoCardProps = {
  name:string;
  birthday: string;
  school: string;
  gradeLevel: string;
  location: string;
  parent: string;
  contact: string
};

const InfoCard: React.FC<InfoCardProps>= ({
  name,
  birthday,
  school,
  gradeLevel,
  location,
  parent,
  contact
}) =>{
  return (
     <Box
      sx={{
        width: 600,
        p: 2.5,
        borderRadius: 2,
        bgcolor: "white",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", mb: 2, fontWeight: 600 }}
      >
        {name}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        <InfoBox label="Birthday" value={birthday} />
        <InfoBox label="School" value={school} />
        <InfoBox label="Grade Level" value={gradeLevel} />
        <InfoBox label="Location" value={location} />
        <InfoBox label="Parent" value={parent} />
        <InfoBox label="Contact" value={contact} />
      </Box>
    </Box>

  );
};

type ContactCardProps = {
  phone: string;
  email: string;
  address: string;
  guardianName: string;
};

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        bgcolor: "#f3f3f3",
        p: 1.5,
        borderRadius: 1.5,
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: "0.55rem" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.95rem" }}>{value}</Typography>
    </Box>
  );
}

export default InfoCard;