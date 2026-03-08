"use client";

import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  login({
    id: "1",
    name: "Admin User",
    email: "admin@test.com",
    password: "123",
    role: "admin"
  });
  router.push("/dashboard");
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
            label="Email"
            type="email"
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}