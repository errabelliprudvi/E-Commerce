import React, { useState } from "react";
import { useUser } from "../UserProvider";
import { useNavigate } from "react-router-dom";


import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

import { userlogin, userSignUp} from "../api";


const AuthPage = ({ setIsAuthenticated }) => {
  
  const navigate = useNavigate()
  

  const {setUser,fetchNumberOfItemsInCart , setIsAdmin} =useUser()
  const [isLogin, setIsLogin] = useState(true); // Toggle Login/Sign-Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // For error/success messages

  const signUp = async () => {
    try {
        const res = await userSignUp({ 
          name,
          email,
          password, 
          phone: mobile,
        });

      setMessage({ type: "success", text: "Registration successful! Please log in." });
      setIsLogin(true); // Switch to login mode
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const login = async () => {
    try {
        const res = await userlogin({email, password,});
        setMessage({ type: "success", text: "Login successful!" });
        console.log(res);
        setIsAuthenticated(true);
        setUser(res.user.id);
        setIsAdmin(res.user.isAdmin);
        fetchNumberOfItemsInCart(res.user.id);
        navigate('/');
        } 
        catch (error) 
        {
        setMessage({ type: "error", text: error.message });
        }};





  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Clear previous messages

    if (isLogin) {
      login();
    } else {
      signUp();
    }
  };

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setMessage({ type: "", text: "" }); // Clear messages
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
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {isLogin
                ? "Welcome back! Please log in to your account."
                : "Create your account to get started."}
            </Typography>

            {/* Display messages */}
            {message.text && (
              <Alert severity={message.type} sx={{ width: "100%" }}>
                {message.text}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: "100%", mt: 2 }}
            >
              {!isLogin && (
                <>
                  <TextField
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                      pattern: "[0-9]{10}",
                      title: "Please enter a valid 10-digit mobile number",
                    }}
                  />
                </>
              )}
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
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={toggleAuthMode}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AuthPage;
