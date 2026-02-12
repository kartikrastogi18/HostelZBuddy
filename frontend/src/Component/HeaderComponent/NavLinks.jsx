import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const pages = ["Home", "Dashboard", "Apply Rebate", "Rebate History"];

const NavLinks = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page}
          component={Link}
          to={
            page === "Home"
              ? "/"
              : `/${page.toLowerCase().replace(" ", "-")}`
          }
          sx={{
            mx: 1.5,
            px: 2,
            py: 1,
            color: "#fff",
            fontWeight: 500,
            borderRadius: "8px",
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;