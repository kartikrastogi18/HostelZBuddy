import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

const AuthButtons = () => {
  return (
    <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
      <Button
        component={Link}
        to="/login"
        variant="outlined"
        sx={{
          color: "#fff",
          borderColor: "rgba(255,255,255,0.5)",
          borderRadius: "20px",
          px: 3,
          textTransform: "none",
          fontWeight: 500,
          "&:hover": {
            borderColor: "#fff",
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        Login
      </Button>

      <Button
        component={Link}
        to="/signup"
        variant="contained"
        sx={{
          backgroundColor: "#ffca28",
          color: "#1a237e",
          borderRadius: "20px",
          px: 3,
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#ffc107",
            transform: "translateY(-2px)",
          },
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default AuthButtons;