import React, { useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import ResetPasswordDialog from "./ResetPasswordDialog";
import ErrorSnackbar from "./ErrorSnackbar";
import { collegeDomain } from "./constants";

// 🔥 Dummy Users (Temporary Database)
const users = [
  {
    role: "student",
    email: "student@jnu.ac.in",
    password: "123456",
  },
  {
    role: "admin",
    email: "admin@jnu.ac.in",
    password: "admin123",
  },
];  

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [resetEmail, setResetEmail] = useState("");

  const validateCollegeEmail = (email) =>
    email.endsWith(collegeDomain);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // ✅ Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};
    let messages = [];

    if (!formData.role) {
      tempErrors.role = "Please select role";
      messages.push("Select your role");
    }

    if (!formData.email) {
      tempErrors.email = "College Email is required";
      messages.push("Enter your college email");
    } else if (!validateCollegeEmail(formData.email)) {
      tempErrors.email = `Email must end with ${collegeDomain}`;
      messages.push(`Email must end with ${collegeDomain}`);
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      messages.push("Enter your password");
    }

    setErrors(tempErrors);

    // 🔥 Validation Failed
    if (Object.keys(tempErrors).length > 0) {
      setSnackbarMessage(messages.join(", "));
      setOpenSnackbar(true);
      return;
    }

    // 🔥 Check Dummy Users
    const user = users.find(
      (u) =>
        u.role === formData.role &&
        u.email === formData.email &&
        u.password === formData.password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);
      window.dispatchEvent(new Event("storage"));
      
      setSnackbarMessage("Login Successful ✅");
      setOpenSnackbar(true);

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      }, 1500);
    } else {
      setSnackbarMessage("Invalid email or password ❌");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={12} sx={{ p: 4, borderRadius: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Login
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            Login using your college email
          </Typography>

          <LoginForm
            formData={formData}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            openResetDialog={() => setOpenReset(true)}
          />
        </Paper>
      </Container>

      {/* 🔥 Error / Success Snackbar */}
      <ErrorSnackbar
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

      {/* 🔥 Reset Password Dialog */}
      <ResetPasswordDialog
        open={openReset}
        handleClose={() => setOpenReset(false)}
        resetEmail={resetEmail}
        setResetEmail={setResetEmail}
      />
    </Box>
  );
};

export default Login;