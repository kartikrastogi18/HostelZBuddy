import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Typography, Avatar, Box, Chip, Paper,
  useMediaQuery, useTheme,
} from "@mui/material";
import {
  Phone, Email, Bloodtype, Event, School,
  MeetingRoom, ContactPhone, VerifiedUser,
} from "@mui/icons-material";

const DetailItem = ({ icon, label, value }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.25, sm: 1.5 },
      display: "flex",
      alignItems: "center",
      gap: { xs: 1.5, sm: 2 },
      borderRadius: "12px",
      bgcolor: "#f5f7ff",
      border: "1px solid rgba(99,102,241,0.1)",
      transition: "all 0.2s",
      "&:hover": {
        bgcolor: "#eef2ff",
        borderColor: "rgba(99,102,241,0.22)",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(99,102,241,0.08)",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        p: { xs: 0.75, sm: 1 },
        borderRadius: "10px",
        bgcolor: "#fff",
        color: "#6366f1",
        boxShadow: "0 2px 6px rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.1)",
        flexShrink: 0,
      }}
    >
      {React.cloneElement(icon, { fontSize: "small", sx: { fontSize: { xs: 15, sm: 17 } } })}
    </Box>
    <Box sx={{ overflow: "hidden" }}>
      <Typography
        variant="caption"
        sx={{
          color: "#9ca3af",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: { xs: "0.6rem", sm: "0.65rem" },
          display: "block",
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#1e1b4b",
          fontWeight: 700,
          fontSize: { xs: "0.78rem", sm: "0.82rem" },
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value || "Not Provided"}
      </Typography>
    </Box>
  </Paper>
);

const StudentDetailsModal = ({ open, onClose, student }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!student) return null;
  const isPaid = student.paymentStatus === "Paid";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: "24px" },
          overflow: "hidden",
          border: "1px solid rgba(99,102,241,0.15)",
          boxShadow: "0 24px 64px rgba(99,102,241,0.12)",
        },
      }}
    >
      {/* Decorative gradient header */}
      <Box
        sx={{
          height: { xs: 70, sm: 80 },
          background: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #a855f7 100%)",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "40%",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08))",
          },
        }}
      />

      <DialogTitle sx={{ mt: { xs: -4.5, sm: -5 }, px: { xs: 2.5, sm: 4 }, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: { xs: 1.5, sm: 2 } }}>
          <Avatar
            sx={{
              width: { xs: 72, sm: 90 },
              height: { xs: 72, sm: 90 },
              bgcolor: "#fff",
              color: "#6366f1",
              fontSize: { xs: "1.6rem", sm: "2rem" },
              fontWeight: 800,
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              border: "4px solid #fff",
              flexShrink: 0,
            }}
          >
            {student.name[0]}
          </Avatar>
          <Box sx={{ pb: 0.5, overflow: "hidden" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#1e1b4b",
                lineHeight: 1.2,
                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {student.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
              <Chip
                icon={<VerifiedUser sx={{ fontSize: "12px !important" }} />}
                label={student.paymentStatus}
                size="small"
                sx={{
                  fontWeight: 700,
                  height: 22,
                  fontSize: "0.65rem",
                  bgcolor: isPaid ? "#ecfdf5" : "#fef2f2",
                  color: isPaid ? "#059669" : "#dc2626",
                  border: `1px solid ${isPaid ? "rgba(5,150,105,0.2)" : "rgba(220,38,38,0.2)"}`,
                }}
              />
              <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 600, fontSize: "0.68rem" }}>
                ID: HOSTEL-{student.room.replace("-", "")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, pb: 2, pt: "16px !important" }}>

        <Typography
          variant="overline"
          sx={{ color: "#6366f1", fontWeight: 800, mb: 1.5, display: "block", fontSize: { xs: "0.62rem", sm: "0.65rem" } }}
        >
          Personal Details
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid item xs={12} sm={6}><DetailItem icon={<Phone />} label="Phone" value={student.phone} /></Grid>
          <Grid item xs={12} sm={6}><DetailItem icon={<Email />} label="Email" value={student.email} /></Grid>
          <Grid item xs={12} sm={6}><DetailItem icon={<Bloodtype />} label="Blood Group" value={student.bloodGroup} /></Grid>
          <Grid item xs={12} sm={6}><DetailItem icon={<Event />} label="Birthday" value={student.dob} /></Grid>
        </Grid>

        <Typography
          variant="overline"
          sx={{ color: "#6366f1", fontWeight: 800, mt: { xs: 2.5, sm: 3 }, mb: 1.5, display: "block", fontSize: { xs: "0.62rem", sm: "0.65rem" } }}
        >
          Hostel &amp; Academic
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid item xs={12} sm={6}><DetailItem icon={<MeetingRoom />} label="Room" value={student.room} /></Grid>
          <Grid item xs={12} sm={6}><DetailItem icon={<School />} label="Course" value={student.course} /></Grid>
          <Grid item xs={12}><DetailItem icon={<ContactPhone />} label="Emergency Contact" value={student.emergencyContact} /></Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: { xs: 2.5, sm: 4 },
          pt: "12px !important",
          borderTop: "1px solid rgba(99,102,241,0.08)",
          bgcolor: "#fafbff",
        }}
      >
        <Button
          onClick={onClose}
          fullWidth
          variant="contained"
          sx={{
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 700,
            py: { xs: 1.1, sm: 1.4 },
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
            background: "linear-gradient(135deg, #1e1b4b, #312e81)",
            boxShadow: "0 4px 14px rgba(30,27,75,0.2)",
            "&:hover": {
              background: "linear-gradient(135deg, #312e81, #4338ca)",
              boxShadow: "0 6px 18px rgba(30,27,75,0.3)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Close Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetailsModal;