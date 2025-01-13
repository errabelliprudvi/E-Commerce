// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Import Link for routing

const LoginPage = (setIsAuthenticated) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add authentication logic here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Welcome back! Please login to your account.
            </Typography>

            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ width: "100%", mt: 2 }}
            >
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                Login
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
              New to our website?{" "}
              <Button
                component={RouterLink}
                to="/signup"
                variant="text"
                color="primary"
                size="small"
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
