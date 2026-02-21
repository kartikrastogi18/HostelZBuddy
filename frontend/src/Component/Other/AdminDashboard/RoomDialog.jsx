import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, IconButton, Grid, Button } from "@mui/material";
import { MeetingRoom, Close } from "@mui/icons-material";

const RoomDialog = ({ open, onClose, rooms }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "20px" } }}>
    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MeetingRoom color="primary" />
        <Typography variant="h6" fontWeight="800">Available Rooms</Typography>
      </Box>
      <IconButton onClick={onClose} size="small"><Close /></IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={2}>
        {rooms.map((room) => (
          <Grid item xs={4} key={room}>
            <Box sx={{ 
              p: 1.5, borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center", 
              fontWeight: "700", bgcolor: "#f8fafc", "&:hover": { bgcolor: "#eef2ff" } 
            }}>
              {room}
            </Box>
          </Grid>
        ))}
      </Grid>
    </DialogContent>
    <DialogActions sx={{ p: 3 }}>
      <Button fullWidth variant="contained" sx={{ bgcolor: "#6366f1", borderRadius: "10px" }}>Allocate New Room</Button>
    </DialogActions>
  </Dialog>
);

export default RoomDialog;