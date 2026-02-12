import { Typography, Box } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        border: "2px solid #fff",
        borderRadius: "8px",
        padding: "4px 10px",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "#f5f5f5",
        },
      }}
      component={Link}
      to="/"
    >
      <RestaurantMenuIcon
        sx={{
          display: { xs: "none", md: "flex" },
          mr: 1.5,
          color: "#fff",
          fontSize: 30,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.1)" },
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          letterSpacing: ".1rem",
          color: "#fff",
          textDecoration: "none",
          transition: "opacity 0.3s ease",
          "&:hover": { opacity: 0.8 },
        }}
      >
        Hostel Portal
      </Typography>
    </Box>
  );
};

export default Logo;
