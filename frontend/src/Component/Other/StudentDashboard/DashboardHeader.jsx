import React from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { NotificationsNone } from "@mui/icons-material";

const DashboardHeader = ({ name, room }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
    <Box>
      <Typography variant="h4" fontWeight="900" sx={{ color: "#0f172a", letterSpacing: "-0.03em" }}>
        Portal Overview
      </Typography>
      <Typography variant="body1" sx={{ color: "#64748b", mt: 0.5 }}>
        {name} • Room <span style={{ color: "#6366f1", fontWeight: "700" }}>{room}</span>
      </Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      <IconButton sx={{ bgcolor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <NotificationsNone />
      </IconButton>
      <Avatar sx={{ width: 52, height: 52, bgcolor: "#6366f1", fontWeight: "bold", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
        {name.split(' ').map(n => n[0]).join('')}
      </Avatar>
    </Box>
  </Box>
);

export default DashboardHeader;