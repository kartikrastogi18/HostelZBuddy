import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, MenuItem, Typography,
  Divider, Box, InputAdornment, useMediaQuery, useTheme,
} from "@mui/material";
import {
  Badge, Phone, Email, Event,
  Bloodtype, School, MeetingRoom, ContactPhone, Close, PersonAdd,
} from "@mui/icons-material";

const fieldSx = (accentColor = "#6366f1") => ({
  "& .MuiFilledInput-root": {
    borderRadius: "12px",
    bgcolor: "#f5f7ff",
    fontSize: { xs: "0.82rem", sm: "0.875rem" },
    "&:hover": { bgcolor: "#eef2ff" },
    "&.Mui-focused": { bgcolor: "#eef2ff" },
    "&::before": { borderBottom: "none" },
    "&::after": { borderBottomColor: accentColor },
  },
  "& .MuiInputLabel-root": {
    fontSize: { xs: "0.82rem", sm: "0.875rem" },
    "&.Mui-focused": { color: accentColor },
  },
});

const AddStudentModal = ({ open, onClose, onAdd }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const blank = {
    name: "", room: "", course: "", gender: "Male",
    phone: "", email: "", dob: "", bloodGroup: "",
    emergencyContact: "", paymentStatus: "Pending",
  };

  const [formData, setFormData] = useState(blank);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const iconStyle = { color: "#6366f1", fontSize: 18 };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.name || !formData.room || !formData.phone) {
      return alert("Please fill Name, Room, and Phone Number.");
    }
    onAdd({
      ...formData,
      joinDate: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    });
    onClose();
    setFormData(blank);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: "24px" },
          border: "1px solid rgba(99,102,241,0.15)",
          boxShadow: "0 24px 64px rgba(99,102,241,0.12)",
          overflow: "hidden",
        },
      }}
    >
      {/* Top accent */}
      <Box sx={{ height: "3px", background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)" }} />

      {/* Title */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2.5, sm: 3.5 },
          py: { xs: 2, sm: 2.5 },
          borderBottom: "1px solid rgba(99,102,241,0.08)",
          bgcolor: "#f5f7ff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38, height: 38,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
            }}
          >
            <PersonAdd sx={{ color: "#fff", fontSize: 18 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              fontWeight="800"
              sx={{ color: "#1e1b4b", fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, lineHeight: 1.2 }}
            >
              Register New Resident
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: { xs: "0.7rem", sm: "0.72rem" } }}>
              Fill in student details below
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={onClose}
          size="small"
          sx={{
            minWidth: "auto",
            color: "#6b7280",
            bgcolor: "rgba(99,102,241,0.06)",
            borderRadius: "8px",
            p: 0.75,
            "&:hover": { bgcolor: "rgba(99,102,241,0.12)", color: "#6366f1" },
          }}
        >
          <Close fontSize="small" />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2.5, sm: 3.5 }, py: { xs: 2.5, sm: 3 } }}>
        <Box sx={{ mt: 0.5 }}>

          {/* Section: Personal Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
            <Box sx={{ width: 26, height: 26, borderRadius: "8px", bgcolor: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(99,102,241,0.2)" }}>
              <Badge sx={{ fontSize: 14, color: "#6366f1" }} />
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#6366f1", fontSize: { xs: "0.82rem", sm: "0.875rem" } }}>
              Personal Information
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 2.5 }}>

            {/* Row 1: Full Name | DOB | Gender */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name *" name="name" variant="filled" onChange={handleChange} value={formData.name} sx={fieldSx()} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth label="Date of Birth" name="dob" type="date" variant="filled"
                InputLabelProps={{ shrink: true }} onChange={handleChange} value={formData.dob}
                InputProps={{ startAdornment: <InputAdornment position="start"><Event sx={iconStyle} /></InputAdornment> }}
                sx={fieldSx()}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth select label="Gender" name="gender" value={formData.gender} variant="filled" onChange={handleChange} sx={fieldSx()}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            {/* Row 2: Email | Phone | Blood Group — equal thirds on desktop */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth label="Email Address" name="email" type="email" variant="filled"
                onChange={handleChange} value={formData.email}
                InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={iconStyle} /></InputAdornment> }}
                sx={fieldSx()}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth label="Phone *" name="phone" variant="filled"
                onChange={handleChange} value={formData.phone}
                InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={iconStyle} /></InputAdornment> }}
                sx={fieldSx()}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth select label="Blood Group" name="bloodGroup" variant="filled"
                value={formData.bloodGroup} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><Bloodtype sx={iconStyle} /></InputAdornment> }}
                sx={fieldSx()}
              >
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>

          <Divider sx={{ my: { xs: 3, md: 3.5 }, borderColor: "rgba(99,102,241,0.1)" }} />

          {/* Section: Hostel Details */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
            <Box sx={{ width: 26, height: 26, borderRadius: "8px", bgcolor: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(99,102,241,0.2)" }}>
              <School sx={{ fontSize: 14, color: "#6366f1" }} />
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#6366f1", fontSize: { xs: "0.82rem", sm: "0.875rem" } }}>
              Academic &amp; Hostel Details
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth label="Room No *" name="room" variant="filled" placeholder="A-101"
                onChange={handleChange} value={formData.room}
                InputProps={{ startAdornment: <InputAdornment position="start"><MeetingRoom sx={iconStyle} /></InputAdornment> }}
                sx={fieldSx()}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField fullWidth label="Course / Department" name="course" variant="filled" onChange={handleChange} value={formData.course} sx={fieldSx()} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Emergency Contact (Parent/Guardian)" name="emergencyContact" variant="filled"
                placeholder="Name — Phone Number" onChange={handleChange} value={formData.emergencyContact}
                InputProps={{ startAdornment: <InputAdornment position="start"><ContactPhone sx={iconStyle} /></InputAdornment> }}
                sx={fieldSx()}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          py: { xs: 2, sm: 2.5 },
          gap: 1.5,
          borderTop: "1px solid rgba(99,102,241,0.08)",
          bgcolor: "#fafbff",
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        <Button
          onClick={onClose}
          fullWidth={isMobile}
          sx={{
            color: "#6b7280",
            fontWeight: 700,
            px: 3,
            py: { xs: 1, sm: 1.1 },
            borderRadius: "12px",
            fontSize: { xs: "0.82rem", sm: "0.875rem" },
            "&:hover": { bgcolor: "rgba(99,102,241,0.06)", color: "#6366f1" },
          }}
        >
          Discard
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth={isMobile}
          sx={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.3 },
            borderRadius: "12px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: { xs: "0.82rem", sm: "0.875rem" },
            boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              boxShadow: "0 6px 20px rgba(99,102,241,0.45)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Register Student
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentModal;