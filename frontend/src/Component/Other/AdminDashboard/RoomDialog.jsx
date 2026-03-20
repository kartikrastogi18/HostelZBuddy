import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, IconButton, Grid, Button,
  useMediaQuery, useTheme,
} from "@mui/material";
import { MeetingRoom, Close } from "@mui/icons-material";

const RoomDialog = ({ open, onClose, rooms }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: "20px" },
          border: "1px solid rgba(99,102,241,0.15)",
          boxShadow: "0 20px 60px rgba(99,102,241,0.12)",
          overflow: "hidden",
        },
      }}
    >
      {/* Top accent line */}
      <Box
        sx={{
          height: "3px",
          background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)",
        }}
      />

      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2.5, sm: 3 },
          py: { xs: 2, sm: 2.5 },
          borderBottom: "1px solid rgba(99,102,241,0.08)",
          bgcolor: "#f5f7ff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 34, height: 34,
              borderRadius: "10px",
              bgcolor: "rgba(16,185,129,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <MeetingRoom sx={{ color: "#10b981", fontSize: 18 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              fontWeight="800"
              sx={{ color: "#1e1b4b", fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.2 }}
            >
              Available Rooms
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
              {rooms.length} rooms unoccupied
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#6b7280",
            bgcolor: "rgba(99,102,241,0.06)",
            borderRadius: "8px",
            "&:hover": { bgcolor: "rgba(99,102,241,0.12)", color: "#6366f1" },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3 }, pt: { xs: "20px !important", sm: "24px !important" } }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {rooms.map((room) => (
            <Grid item xs={4} key={room}>
              <Box
                sx={{
                  p: { xs: 1.25, sm: 1.5 },
                  borderRadius: "12px",
                  border: "1px solid rgba(99,102,241,0.15)",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: { xs: "0.78rem", sm: "0.85rem" },
                  color: "#1e1b4b",
                  bgcolor: "#f5f7ff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#eef2ff",
                    borderColor: "#6366f1",
                    color: "#6366f1",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(99,102,241,0.12)",
                  },
                }}
              >
                {room}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2.5, sm: 3 }, pt: "0 !important", borderTop: "1px solid rgba(99,102,241,0.08)" }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            py: { xs: 1, sm: 1.2 },
            fontSize: { xs: "0.82rem", sm: "0.875rem" },
            boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              boxShadow: "0 6px 20px rgba(99,102,241,0.4)",
            },
          }}
        >
          Allocate New Room
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomDialog;