import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import StudentSignupForm from "./StudentSignupForm";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("");

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
          
          {!selectedRole && (
            <>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Sign Up As
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.2 }}
                onClick={() => setSelectedRole("student")}
              >
                Student
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2, py: 1.2 }}
                onClick={() => setSelectedRole("admin")}
              >
                Admin
              </Button>
            </>
          )}

          {selectedRole === "student" && <StudentSignupForm />}
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
