import { Box, Button, List, ListItemButton, ListItemText, Chip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HomeRounded,
  DashboardRounded,
  AdminPanelSettingsRounded,
} from "@mui/icons-material";

const allPages = {
  guest: [
    { name: "Home", path: "/", icon: <HomeRounded fontSize="small" /> },
  ],
  admin: [
    { name: "Home", path: "/", icon: <HomeRounded fontSize="small" /> },
    { name: "Admin Dashboard", path: "/admin-dashboard", icon: <AdminPanelSettingsRounded fontSize="small" />, badge: "Admin" },
  ],
  student: [
    { name: "Home", path: "/", icon: <HomeRounded fontSize="small" /> },
    { name: "Dashboard", path: "/student-dashboard", icon: <DashboardRounded fontSize="small" /> },
  ],
};

const NavLinks = ({ mobile = false, onNavigate }) => {
  const [pages, setPages] = useState(allPages.guest);
  const location = useLocation();

  useEffect(() => {
    const updateRole = () => {
      const role = localStorage.getItem("userRole");
      if (role === "admin") setPages(allPages.admin);
      else if (role === "student") setPages(allPages.student);
      else setPages(allPages.guest);
    };
    updateRole();
    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  /* ── Mobile drawer list ── */
  if (mobile) {
    return (
      <List sx={{ px: 1.5, pt: 2 }}>
        {pages.map((page, i) => {
          const isActive = location.pathname === page.path;
          return (
            <ListItemButton
              key={page.name}
              component={Link}
              to={page.path}
              onClick={onNavigate}
              sx={{
                borderRadius: "12px",
                mb: 0.75,
                px: 2,
                py: 1.25,
                background: isActive
                  ? "linear-gradient(135deg, rgba(255,202,40,0.15), rgba(255,202,40,0.05))"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(255,202,40,0.35)"
                  : "1px solid transparent",
                transition: "all 0.25s ease",
                animationDelay: `${i * 60}ms`,
                "&:hover": {
                  background: "rgba(255,202,40,0.1)",
                  border: "1px solid rgba(255,202,40,0.25)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box
                sx={{
                  color: isActive ? "#ffca28" : "rgba(255,255,255,0.6)",
                  mr: 1.5,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {page.icon}
              </Box>
              <ListItemText
                primary={page.name}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#ffca28" : "rgba(255,255,255,0.85)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              />
              {page.badge && (
                <Chip
                  label={page.badge}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    bgcolor: "rgba(255,202,40,0.2)",
                    color: "#ffca28",
                    border: "1px solid rgba(255,202,40,0.4)",
                    fontWeight: 700,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    );
  }

  /* ── Desktop horizontal nav ── */
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {pages.map((page) => {
        const isActive = location.pathname === page.path;
        return (
          <Button
            key={page.name}
            component={Link}
            to={page.path}
            startIcon={page.icon}
            sx={{
              px: { md: 1.5, lg: 2 },
              py: 1,
              color: isActive ? "#ffca28" : "rgba(255,255,255,0.75)",
              fontWeight: isActive ? 700 : 500,
              fontFamily: "'Outfit', sans-serif",
              fontSize: { md: "0.85rem", lg: "0.92rem" },
              borderRadius: "10px",
              textTransform: "none",
              letterSpacing: 0.3,
              position: "relative",
              background: isActive
                ? "linear-gradient(135deg, rgba(255,202,40,0.12), rgba(255,202,40,0.04))"
                : "transparent",
              border: isActive
                ? "1px solid rgba(255,202,40,0.3)"
                : "1px solid transparent",
              transition: "all 0.2s ease",
              "& .MuiButton-startIcon": {
                color: isActive ? "#ffca28" : "rgba(255,255,255,0.5)",
                transition: "color 0.2s",
              },
              "&:hover": {
                color: "#ffca28",
                background: "rgba(255,202,40,0.08)",
                border: "1px solid rgba(255,202,40,0.2)",
                transform: "translateY(-1px)",
                "& .MuiButton-startIcon": { color: "#ffca28" },
              },
              // Animated underline for active
              "&::after": isActive
                ? {
                    content: '""',
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "2px",
                    borderRadius: "2px",
                    background: "#ffca28",
                    boxShadow: "0 0 6px rgba(255,202,40,0.6)",
                  }
                : {},
            }}
          >
            {page.name}
            {page.badge && (
              <Chip
                label={page.badge}
                size="small"
                sx={{
                  ml: 0.75,
                  height: 18,
                  fontSize: "0.6rem",
                  bgcolor: "rgba(255,202,40,0.2)",
                  color: "#ffca28",
                  border: "1px solid rgba(255,202,40,0.4)",
                  fontWeight: 700,
                }}
              />
            )}
          </Button>
        );
      })}
    </Box>
  );
};

export default NavLinks;