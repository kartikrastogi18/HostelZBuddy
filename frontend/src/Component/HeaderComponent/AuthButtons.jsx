import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  LogoutRounded,
  PersonRounded,
  LoginRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

/**
 * Props:
 *  compact    — icon-only login button (used in mobile toolbar)
 *  drawerMode — full-width login button + user info (used inside mobile drawer)
 */
const AuthButtons = ({ compact = false, drawerMode = false }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const syncLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    syncLogin();
    window.addEventListener("storage", syncLogin);
    return () => window.removeEventListener("storage", syncLogin);
  }, []);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    handleCloseMenu();
    navigate("/");
  };

  const userEmail = localStorage.getItem("userEmail") || "";
  const userRole  = localStorage.getItem("userRole")  || "";
  const userInitial = userEmail.charAt(0).toUpperCase() || "U";

  /* ────────────────────────────────────────────
     DRAWER MODE — shown at bottom of mobile drawer
  ──────────────────────────────────────────── */
  if (drawerMode) {
    if (!isLoggedIn) {
      return (
        <Button
          component={Link}
          to="/login"
          variant="contained"
          fullWidth
          startIcon={<LoginRounded />}
          sx={{
            background: "linear-gradient(135deg, #ffca28, #ffd54f)",
            color: "#0a0f2e",
            borderRadius: "12px",
            py: 1.2,
            fontWeight: 700,
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.95rem",
            boxShadow: "0 4px 15px rgba(255,202,40,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #ffd54f, #ffe082)",
              boxShadow: "0 6px 20px rgba(255,202,40,0.45)",
            },
          }}
        >
          Login
        </Button>
      );
    }

    // Logged in — show user card + logout button inside drawer
    return (
      <Box>
        {/* User info card */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 1.5,
            py: 1.25,
            mb: 1.5,
            borderRadius: "12px",
            background: "rgba(255,202,40,0.07)",
            border: "1px solid rgba(255,202,40,0.18)",
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, #ffca28, #ffa000)",
              color: "#0a0f2e",
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            {userInitial}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Outfit', sans-serif",
                textTransform: "capitalize",
                lineHeight: 1.2,
              }}
            >
              {userRole || "User"}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 170,
              }}
            >
              {userEmail}
            </Typography>
          </Box>
        </Box>

        {/* Logout button */}
        <Button
          onClick={handleLogout}
          fullWidth
          variant="outlined"
          startIcon={<LogoutRounded />}
          sx={{
            borderRadius: "12px",
            py: 1.1,
            borderColor: "rgba(255,107,107,0.5)",
            color: "#ff6b6b",
            fontWeight: 600,
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            "&:hover": {
              background: "rgba(255,107,107,0.1)",
              borderColor: "#ff4444",
              color: "#ff4444",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    );
  }

  /* ────────────────────────────────────────────
     NORMAL / COMPACT MODE — shown in AppBar
  ──────────────────────────────────────────── */
  return (
    <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
      {!isLoggedIn ? (
        <Button
          component={Link}
          to="/login"
          variant="contained"
          startIcon={!compact && <LoginRounded sx={{ fontSize: "1rem !important" }} />}
          sx={{
            background: "linear-gradient(135deg, #ffca28, #ffd54f)",
            color: "#0a0f2e",
            borderRadius: "12px",
            px: compact ? 1.5 : { sm: 2, md: 2.5 },
            py: { xs: 0.7, sm: 0.85 },
            textTransform: "none",
            fontWeight: 700,
            fontFamily: "'Outfit', sans-serif",
            fontSize: { xs: "0.82rem", sm: "0.875rem", md: "0.92rem" },
            letterSpacing: 0.3,
            boxShadow: "0 4px 15px rgba(255,202,40,0.35)",
            border: "1px solid rgba(255,202,40,0.5)",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #ffd54f, #ffe082)",
              boxShadow: "0 6px 20px rgba(255,202,40,0.5)",
              transform: "translateY(-2px)",
            },
            "&:active": { transform: "translateY(0)" },
          }}
        >
          {compact ? <LoginRounded fontSize="small" /> : "Login"}
        </Button>
      ) : (
        <>
          <Tooltip title="My Account" arrow>
            <IconButton
              onClick={handleOpenMenu}
              size="small"
              sx={{
                p: 0.4,
                border: "2px solid rgba(255,202,40,0.4)",
                borderRadius: "12px",
                transition: "all 0.2s ease",
                "&:hover": {
                  border: "2px solid #ffca28",
                  boxShadow: "0 0 16px rgba(255,202,40,0.3)",
                  transform: "scale(1.05)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 },
                  background: "linear-gradient(135deg, #ffca28, #ffa000)",
                  color: "#0a0f2e",
                  fontWeight: 800,
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                }}
              >
                {userInitial}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                background: "linear-gradient(160deg, #0d1340, #1a237e)",
                border: "1px solid rgba(255,202,40,0.2)",
                borderRadius: "14px",
                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                "& .MuiList-root": { p: 1 },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, mb: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 38, height: 38,
                    background: "linear-gradient(135deg, #ffca28, #ffa000)",
                    color: "#0a0f2e", fontWeight: 800, fontSize: "1rem",
                  }}
                >
                  {userInitial}
                </Avatar>
                <Box>
                  <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", textTransform: "capitalize" }}>
                    {userRole || "User"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", fontWeight: 500, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {userEmail}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,202,40,0.12)", mx: 1, mb: 0.75 }} />

            <MenuItem
              onClick={handleCloseMenu}
              sx={{
                borderRadius: "10px", px: 1.5, py: 1,
                color: "rgba(255,255,255,0.75)", fontSize: "0.875rem",
                "&:hover": { background: "rgba(255,202,40,0.08)", color: "#ffca28" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                <PersonRounded fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              sx={{
                borderRadius: "10px", px: 1.5, py: 1, mt: 0.5,
                color: "#ff6b6b", fontWeight: 600, fontSize: "0.875rem",
                "&:hover": { background: "rgba(255,107,107,0.12)", color: "#ff4444" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                <LogoutRounded fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default AuthButtons;