import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));       // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600–900px
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));          // >= 900px

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

  const validateCollegeEmail = (email) => email.endsWith(collegeDomain);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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

    if (Object.keys(tempErrors).length > 0) {
      setSnackbarMessage(messages.join(", "));
      setOpenSnackbar(true);
      return;
    }

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
        // Slight padding so card never touches screen edges on small phones
        px: { xs: 1.5, sm: 3, md: 0 },
        py: { xs: 3, sm: 4, md: 6 },
      }}
    >
      {/*
        maxWidth controls the card width at each breakpoint:
          xs  → full width (minus px padding above)
          sm  → ~480px (tablet portrait)
          md  → ~600px (tablet landscape / small laptop)
          lg  → ~600px (14-inch laptop and above — keep it tight)
      */}
      <Container
        maxWidth="sm"
        disableGutters={isMobile}
        sx={{
          width: {
            xs: "100%",
            sm: "90%",
            md: "70%",
            lg: "55%",
            xl: "45%",
          },
        }}
      >
        <Paper
          elevation={isMobile ? 4 : 12}
          sx={{
            // Responsive padding inside the card
            p: { xs: 2.5, sm: 3.5, md: 4, lg: 5 },
            borderRadius: { xs: 3, sm: 4 },
          }}
        >
          {/* ── Title ── */}
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: {
                xs: "1.4rem",
                sm: "1.75rem",
                md: "2rem",
                lg: "2.125rem",
              },
            }}
          >
            Login
          </Typography>

          {/* ── Subtitle ── */}
          <Typography
            variant="body2"
            align="center"
            sx={{
              mb: { xs: 2, sm: 3 },
              color: "text.secondary",
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            Login using your college email
          </Typography>

          {/* ── Form ── */}
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
        // Anchor snackbar at bottom-center on mobile, bottom-left elsewhere
        anchorOrigin={
          isMobile
            ? { vertical: "bottom", horizontal: "center" }
            : { vertical: "bottom", horizontal: "left" }
        }
      />

      {/* 🔥 Reset Password Dialog */}
      <ResetPasswordDialog
        open={openReset}
        handleClose={() => setOpenReset(false)}
        resetEmail={resetEmail}
        setResetEmail={setResetEmail}
        // Make dialog full-screen on mobile
        fullScreen={isMobile}
      />
    </Box>
  );
};

export default Login;