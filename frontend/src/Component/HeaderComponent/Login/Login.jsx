import React, { useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import ResetPasswordDialog from "./ResetPasswordDialog";
import ErrorSnackbar from "./ErrorSnackbar";
import { collegeDomain } from "./constants";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let errorMessage = "";

    if (!formData.email) {
      tempErrors.email = "College Email is required";
      errorMessage = "Please enter your college email.";
    } else if (!validateCollegeEmail(formData.email)) {
      tempErrors.email = `Email must end with ${collegeDomain}`;
      errorMessage = `Email must end with ${collegeDomain}`;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      errorMessage = "Please enter your password.";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      navigate("/dashboard");
    } else {
      setSnackbarMessage(errorMessage);
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
        background: "linear-gradient(135deg, #1a237e, #283593)",
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
            Student Login
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

      <ErrorSnackbar
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />


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
