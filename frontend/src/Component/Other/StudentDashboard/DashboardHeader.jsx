import React from "react";
import { Box, Typography, IconButton, Avatar, Badge, useMediaQuery, useTheme } from "@mui/material";
import { NotificationsNone } from "@mui/icons-material";

const DashboardHeader = ({ name, room }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const initials = name.split(" ").map((n) => n[0]).join("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: 0 },
        mb: { xs: 3, sm: 4, md: 5 },
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Left: Title */}
      <Box>
        <Typography
          variant="overline"
          sx={{
            color: "#6366f1",
            fontWeight: 700,
            letterSpacing: "0.15em",
            fontSize: { xs: "0.65rem", sm: "0.7rem" },
            display: "block",
            mb: 0.5,
          }}
        >
          Student Portal
        </Typography>
        <Typography
          variant="h4"
          fontWeight="900"
          sx={{
            color: "#1e1b4b",
            letterSpacing: "-0.03em",
            fontSize: { xs: "1.4rem", sm: "1.75rem", md: "2.1rem" },
            lineHeight: 1.1,
          }}
        >
          Portal Overview
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#6b7280", mt: 0.75, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {name} •{" "}
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Room {room}
          </Box>
        </Typography>
      </Box>

      {/* Right: Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
        <Badge
          badgeContent={2}
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "#6366f1",
              color: "#fff",
              fontSize: "0.6rem",
              minWidth: 16,
              height: 16,
            },
          }}
        >
          <IconButton
            sx={{
              bgcolor: "#fff",
              border: "1px solid rgba(99,102,241,0.18)",
              borderRadius: "12px",
              color: "#6366f1",
              width: { xs: 38, sm: 42 },
              height: { xs: 38, sm: 42 },
              boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
              "&:hover": {
                bgcolor: "#eef2ff",
                borderColor: "#6366f1",
              },
              transition: "all 0.2s",
            }}
          >
            <NotificationsNone fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Badge>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: { xs: 40, sm: 46, md: 50 },
              height: { xs: 40, sm: 46, md: 50 },
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              fontWeight: 800,
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
              border: "2px solid rgba(99,102,241,0.2)",
            }}
          >
            {initials}
          </Avatar>
          {!isMobile && (
            <Box>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e1b4b", lineHeight: 1.2 }}>
                {name}
              </Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af" }}>Student</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHeader;