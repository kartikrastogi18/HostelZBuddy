import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";

const AuthButtons = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const userEmail = localStorage.getItem("userEmail");

  return (
    <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
      {!isLoggedIn ? (
        <Button
          component={Link}
          to="/login"
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
          Login
        </Button>
      ) : (
        <>
          <Tooltip title="Account">
            <IconButton onClick={handleOpenMenu}>
              <Avatar
                sx={{
                  bgcolor: "#ffca28",
                  color: "#1a237e",
                  fontWeight: 600,
                }}
              >
                {userEmail?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </IconButton>
          </Tooltip>

         <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            }
          }}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{
              fontWeight: 'bold',
              color: '#d32f2f',
              '&:hover': {
                backgroundColor: '#ffe5e5',
              }
            }}
          >
            Logout
          </MenuItem>
        </Menu>

        </>
      )}
    </Box>
  );
};

export default AuthButtons;
