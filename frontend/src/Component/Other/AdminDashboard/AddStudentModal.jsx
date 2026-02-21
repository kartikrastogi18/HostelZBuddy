import React, { useState } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Grid, MenuItem, Typography, 
  Divider, Box, InputAdornment 
} from "@mui/material";
import { 
  Badge, Phone, Email, Event, 
  Bloodtype, School, MeetingRoom, ContactPhone 
} from "@mui/icons-material";

const AddStudentModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "", room: "", course: "", gender: "Male",
    phone: "", email: "", dob: "", bloodGroup: "",
    emergencyContact: "", paymentStatus: "Pending"
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.room || !formData.phone) {
      return alert("Please fill Name, Room, and Phone Number.");
    }
    onAdd({ 
      ...formData, 
      joinDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) 
    });
    onClose();
    setFormData({
      name: "", room: "", course: "", gender: "Male",
      phone: "", email: "", dob: "", bloodGroup: "",
      emergencyContact: "", paymentStatus: "Pending"
    });
  };

  const iconStyle = { color: "#6366f1", fontSize: 20 };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md" 
      PaperProps={{ 
        sx: { borderRadius: "24px", padding: "8px" } 
      }}
    >
      {/* FIXED: Closing tag now matches Opening tag */}
      <DialogTitle sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b" }}>
        Register New Resident
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: "#6366f1", display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge sx={{ fontSize: 18 }} /> Personal Information
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Full Name" name="name" required variant="filled"
                onChange={handleChange} 
                value={formData.name}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField 
                fullWidth label="DOB" name="dob" type="date" variant="filled"
                InputLabelProps={{ shrink: true }} onChange={handleChange}
                value={formData.dob}
                InputProps={{ startAdornment: <InputAdornment position="start"><Event sx={iconStyle}/></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField 
                fullWidth select label="Gender" name="gender" value={formData.gender} variant="filled"
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Email Address" name="email" type="email" variant="filled"
                onChange={handleChange}
                value={formData.email}
                InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={iconStyle}/></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField 
                fullWidth label="Phone" name="phone" required variant="filled"
                onChange={handleChange}
                value={formData.phone}
                InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={iconStyle}/></InputAdornment> }}
              />
            </Grid>
            
            {/* Blood Group: Fixed width and visibility */}
            <Grid item xs={12} sm={3}>
              <TextField 
                fullWidth select label="Blood Group" name="bloodGroup" variant="filled"
                value={formData.bloodGroup} 
                onChange={handleChange}
                InputProps={{ 
                  startAdornment: <InputAdornment position="start"><Bloodtype sx={iconStyle}/></InputAdornment> 
                }}
              >
                {bloodGroups.map((group) => (
                  <MenuItem key={group} value={group}>{group}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: "#6366f1", display: 'flex', alignItems: 'center', gap: 1 }}>
            <School sx={{ fontSize: 18 }} /> Academic & Hostel Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth label="Room No" name="room" required variant="filled"
                placeholder="A-101" onChange={handleChange}
                value={formData.room}
                InputProps={{ startAdornment: <InputAdornment position="start"><MeetingRoom sx={iconStyle}/></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField 
                fullWidth label="Course / Department" name="course" variant="filled"
                onChange={handleChange} 
                value={formData.course}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Emergency Contact (Parent/Guardian)" name="emergencyContact" variant="filled"
                placeholder="Name - Phone Number" onChange={handleChange}
                value={formData.emergencyContact}
                InputProps={{ startAdornment: <InputAdornment position="start"><ContactPhone sx={iconStyle}/></InputAdornment> }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 1 }}>
        <Button onClick={onClose} sx={{ color: "#64748b", fontWeight: 700, px: 3 }}>
          Discard
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{ 
            bgcolor: "#6366f1", 
            "&:hover": { bgcolor: "#4f46e5" },
            px: 4, py: 1.5, 
            borderRadius: "12px", 
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)"
          }}
        >
          Register Student
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentModal;