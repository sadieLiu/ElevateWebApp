"use client";

import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [passwordHash, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (await login(userName, passwordHash)) { // if login is successful, redirect to dashboard 
      router.push("/dashboard");
    } else {
      setError("Invalid username or password"); // if login is unsuccessful, show an error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>


        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            type="text"
            fullWidth
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={passwordHash}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit" 
            variant="contained"
            size="large"
          >
            Login
          </Button>
          
          {error && (<Alert severity="error"> {error}</Alert>)} 

        </Box>
      </Box>
    </Container>
  );
}