import React from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Grid, Typography, Avatar, Box, Divider, Chip, Paper
} from "@mui/material";
import { 
  Phone, Email, Bloodtype, Event, School, 
  MeetingRoom, ContactPhone, Person, VerifiedUser
} from "@mui/icons-material";

// Enhanced Detail Item with a subtle background hover effect
const DetailItem = ({ icon, label, value }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 1.5, 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      borderRadius: '12px',
      bgcolor: '#f8fafc',
      border: '1px solid #f1f5f9',
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: '#f1f5f9',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Box 
      sx={{ 
        display: 'flex', 
        p: 1, 
        borderRadius: '10px', 
        bgcolor: '#fff', 
        color: "#6366f1", 
        boxShadow: '0 2px 4px rgba(99, 102, 241, 0.1)' 
      }}
    >
      {React.cloneElement(icon, { fontSize: 'small' })}
    </Box>
    <Box>
      <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "#1e293b", fontWeight: 700, display: 'block' }}>
        {value || "Not Provided"}
      </Typography>
    </Box>
  </Paper>
);

const StudentDetailsModal = ({ open, onClose, student }) => {
  if (!student) return null;

  const isPaid = student.paymentStatus === "Paid";

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm" 
      PaperProps={{ 
        sx: { borderRadius: "28px", overflow: 'hidden', border: '1px solid #e2e8f0' } 
      }}
    >
      {/* Decorative Header Background */}
      <Box sx={{ height: '80px', background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)' }} />

      <DialogTitle sx={{ mt: -5, px: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 90, 
              height: 90, 
              bgcolor: "#fff", 
              color: '#6366f1',
              fontSize: "2rem", 
              fontWeight: 800,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              border: '4px solid #fff'
            }}
          >
            {student.name[0]}
          </Avatar>
          <Box sx={{ pb: 0.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b", lineHeight: 1.2 }}>
              {student.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip 
                icon={<VerifiedUser sx={{ fontSize: '14px !important' }} />}
                label={student.paymentStatus} 
                size="small" 
                sx={{ 
                  fontWeight: 700, 
                  bgcolor: isPaid ? '#ecfdf5' : '#fff1f2', 
                  color: isPaid ? '#10b981' : '#f43f5e',
                  border: 'none'
                }} 
              />
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                ID: HOSTEL-{student.room.replace('-', '')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 800, mb: 2, display: 'block' }}>
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
             <DetailItem icon={<Phone />} label="Phone" value={student.phone} />
          </Grid>
          <Grid item xs={12} sm={6}>
             <DetailItem icon={<Email />} label="Email" value={student.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
             <DetailItem icon={<Bloodtype />} label="Blood Group" value={student.bloodGroup} />
          </Grid>
          <Grid item xs={12} sm={6}>
             <DetailItem icon={<Event />} label="Birthday" value={student.dob} />
          </Grid>
        </Grid>

        <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 800, mt: 3, mb: 2, display: 'block' }}>
          Hostel & Academic
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
             <DetailItem icon={<MeetingRoom />} label="Room" value={student.room} />
          </Grid>
          <Grid item xs={12} sm={6}>
             <DetailItem icon={<School />} label="Course" value={student.course} />
          </Grid>
          <Grid item xs={12}>
             <DetailItem icon={<ContactPhone />} label="Emergency Contact" value={student.emergencyContact} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 0 }}>
        <Button 
          onClick={onClose} 
          fullWidth 
          variant="contained" 
          sx={{ 
            borderRadius: "14px", 
            textTransform: 'none', 
            fontWeight: 700,
            py: 1.5,
            bgcolor: '#1e293b',
            '&:hover': { bgcolor: '#0f172a' },
            boxShadow: '0 4px 12px rgba(30, 41, 59, 0.2)'
          }}
        >
          Close Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetailsModal;