import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Define pages with their explicit paths
const allPages = {
  guest: [
    { name: "Home", path: "/" }
  ],
  admin: [
    { name: "Home", path: "/" },
    { name: "Admin Dashboard", path: "/admin-dashboard" }
  ],
  student: [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/student-dashboard" }
  ],
};

const NavLinks = () => {
  const [pages, setPages] = useState(allPages.guest);
  const location = useLocation(); // To track active link styling

  useEffect(() => {
    const updateRole = () => {
      // Note: Ensure your login logic uses "userRole" as the key
      const role = localStorage.getItem("userRole");

      if (role === "admin") setPages(allPages.admin);
      else if (role === "student") setPages(allPages.student);
      else setPages(allPages.guest);
    };

    updateRole();
    // Listen for changes in other tabs/windows
    window.addEventListener("storage", updateRole);

    return () => window.removeEventListener("storage", updateRole);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
      {pages.map((page) => {
        const isActive = location.pathname === page.path;
        
        return (
          <Button
            key={page.name}
            component={Link}
            to={page.path}
            sx={{
              mx: 1,
              px: 2,
              py: 1,
              color: "#fff",
              fontWeight: isActive ? 700 : 500,
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.95rem",
              backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
                transform: "translateY(-1px)",
              },
            }}
          >
            {page.name}
          </Button>
        );
      })}
    </Box>
  );
};

export default NavLinks;