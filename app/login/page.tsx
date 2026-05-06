"use client";

import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [userName, setUserName] = useState("");
  const [passwordHash, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoading) {
    return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading Page...</Typography>;
  }

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
    <Container maxWidth="sm" sx={{bgcolor: "secondary.main", color: "primary.main", display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "10vh", borderRadius: 2, boxShadow: 3}}>
      <Box
        sx={{
          mt: 15,
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
             InputProps={{sx: {color: "white",
              "& .MuiOutlinedInput-notchedOutline": {borderColor: "primary.main"},
              "&:hover .MuiOutlinedInput-notchedOutline": {borderColor: "primary.main"},
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {borderColor: "white"}}
              }}
            InputLabelProps={{sx:{color: "primary.main", "&.Mui-focused": {color:"primary.main"}}}}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={passwordHash}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{sx: {color: "white",
              "& .MuiOutlinedInput-notchedOutline": {borderColor: "primary.main"},
              "&:hover .MuiOutlinedInput-notchedOutline": {borderColor: "primary.main"},
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {borderColor: "white"}}
              }}
            InputLabelProps={{sx:{color: "primary.main", "&.Mui-focused": {color:"primary.main"}}}}
          />

          <Button
            type="submit" 
            variant="contained"
            size="large"
            sx={{ mt: 2, bgcolor: "primary.main", color: "secondary.main", "&:hover": { bgcolor: "primary.dark" }, marginBottom:4 }}
          >
            Login
          </Button>
          
          {error && (<Alert severity="error"> {error}</Alert>)} 

        </Box>
      </Box>
    </Container>
  );
}