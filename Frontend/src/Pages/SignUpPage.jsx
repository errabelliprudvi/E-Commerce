// src/pages/SignUpPage.jsx
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

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Mobile:", mobile);
    console.log("Password:", password);
    // Add sign-up logic here
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
              Sign Up
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Create your account to get started.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSignUp}
              noValidate
              sx={{ width: "100%", mt: 2 }}
            >
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
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
                label="Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
                required
                margin="normal"
                inputProps={{
                  pattern: "[0-9]{10}", // Ensures 10 digits are entered
                  title: "Please enter a valid 10-digit mobile number",
                }}
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
                Sign Up
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUpPage;
