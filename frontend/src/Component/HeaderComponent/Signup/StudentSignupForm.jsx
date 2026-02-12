import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const collegeDomain = "@college.edu"; // change to real domain

const StudentSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    email: "",
    collegePassword: "",
    websitePassword: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.name)
      tempErrors.name = "Full Name is required";

    if (!formData.enrollment)
      tempErrors.enrollment = "Enrollment Number is required";

    if (!formData.email)
      tempErrors.email = "College Email is required";
    else if (!validateCollegeEmail(formData.email))
      tempErrors.email = `Email must end with ${collegeDomain}`;

    if (!formData.collegePassword)
      tempErrors.collegePassword = "College Password is required";

    if (!formData.websitePassword)
      tempErrors.websitePassword = "Website Password is required";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      alert("Student Registered Successfully!");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Student Registration
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        name="name"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <TextField
        fullWidth
        label="Enrollment Number"
        name="enrollment"
        margin="normal"
        value={formData.enrollment}
        onChange={handleChange}
        error={Boolean(errors.enrollment)}
        helperText={errors.enrollment}
      />

      <TextField
        fullWidth
        label="College Email"
        name="email"
        type="email"
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        label="College Password"
        name="collegePassword"
        type={showPassword ? "text" : "password"}
        margin="normal"
        value={formData.collegePassword}
        onChange={handleChange}
        error={Boolean(errors.collegePassword)}
        helperText={errors.collegePassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Website Password"
        name="websitePassword"
        type="password"
        margin="normal"
        value={formData.websitePassword}
        onChange={handleChange}
        error={Boolean(errors.websitePassword)}
        helperText={errors.websitePassword}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, py: 1.2 }}
      >
        Register
      </Button>
    </Box>
  );
};

export default StudentSignupForm;
