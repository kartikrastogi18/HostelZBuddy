import React, { useState } from "react";
import { 
  Card, CardContent, Typography, Grid, Avatar, Button, 
  Chip, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Box, IconButton, Badge, Tooltip,
  TextField, InputAdornment, Paper
} from "@mui/material";
import { 
  MeetingRoom, People, Assignment, Feedback, 
  FilterList, Download, CheckCircle, Search,
  Payments, RoomPreferences, InfoOutlined
} from "@mui/icons-material";
import { motion } from "framer-motion";

// --- Styling ---
const styles = {
  container: { padding: "32px", backgroundColor: "#f1f5f9", minHeight: "100vh" },
  card: {
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    border: "1px solid #e2e8f0",
    bgcolor: "#fff"
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    "& th": { color: "#64748b", fontWeight: "600", fontSize: "0.75rem", textTransform: "uppercase" }
  },
  emptyRoomBox: {
    p: 1.5, borderRadius: "8px", border: "1px dashed #cbd5e1", 
    textAlign: "center", fontWeight: "700", color: "#475569",
    bgcolor: "#f8fafc"
  }
};

// --- Mock Data ---
const adminStats = [
  { title: "Empty Rooms", value: "12", subtitle: "Available Now", icon: <MeetingRoom sx={{ color: "#10b981" }} />, bgColor: "#ecfdf5" },
  { title: "Total Students", value: "138", subtitle: "Active Residents", icon: <People sx={{ color: "#6366f1" }} />, bgColor: "#eef2ff" },
  { title: "Pending Rebates", value: "08", subtitle: "Requires Action", icon: <Assignment sx={{ color: "#f59e0b" }} />, bgColor: "#fffbeb" },
  { title: "Open Complaints", value: "03", subtitle: "High Priority", icon: <Feedback sx={{ color: "#ef4444" }} />, bgColor: "#fef2f2" },
];

const emptyRoomList = ["A-102", "A-205", "B-110", "B-302", "C-101", "C-204"];

const studentDirectory = [
  { name: "Rahul Sharma", room: "A-203", course: "B.Tech CSE", gender: "Male", joinDate: "Aug 2023", paymentStatus: "Paid" },
  { name: "Aditi Verma", room: "B-105", course: "M.B.A", gender: "Female", joinDate: "July 2023", paymentStatus: "Pending" },
  { name: "Siddharth J.", room: "A-110", course: "B.Sc Physics", gender: "Male", joinDate: "Sept 2023", paymentStatus: "Paid" },
  { name: "Priya Singh", room: "C-201", course: "B.A English", gender: "Female", joinDate: "Aug 2022", paymentStatus: "Overdue" },
  { name: "Amit Patel", room: "B-302", course: "B.Tech ME", gender: "Male", joinDate: "Jan 2024", paymentStatus: "Paid" },
  { name: "Sneha Kapur", room: "C-104", course: "B.Des", gender: "Female", joinDate: "Dec 2023", paymentStatus: "Pending" },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Search Logic
  const filteredStudents = studentDirectory.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={styles.container}>
      
      {/* 1. Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "#1e293b" }}>Admin Oversight</Typography>
          <Typography sx={{ color: "#64748b" }}>Hostel Operations & Resident Management</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          
          <Avatar sx={{ width: 48, height: 48, bgcolor: "#1e293b" }}>AD</Avatar>
        </Box>
      </Box>

      {/* 2. Top Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {adminStats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card sx={styles.card}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: item.bgColor }}>{item.icon}</Box>
                    <Badge color="error" variant="dot" invisible={item.value === "00"} />
                  </Box>
                  <Typography variant="h4" fontWeight="700" sx={{ mt: 2, color: "#1e293b" }}>{item.value}</Typography>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: "600" }}>{item.title}</Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8" }}>{item.subtitle}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* 3. Main Student Directory */}
        <Grid item xs={12} lg={9}>
          <Card sx={styles.card}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
                <Typography variant="h6" fontWeight="700">Resident Directory</Typography>
                
                <TextField
                  placeholder="Search name or room..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: { xs: "100%", sm: "320px" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "10px", bgcolor: "#f8fafc" }
                  }}
                />
              </Box>

              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <Table>
                  <TableHead sx={styles.tableHeader}>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Course & Gender</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, index) => (
                        <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                               <Avatar sx={{ width: 36, height: 36, bgcolor: "#6366f1", fontSize: '0.9rem' }}>{student.name[0]}</Avatar>
                               <Box>
                                 <Typography variant="body2" fontWeight="600" color="#1e293b">{student.name}</Typography>
                                 <Typography variant="caption" color="#64748b">Joined {student.joinDate}</Typography>
                               </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={student.room} size="small" sx={{ fontWeight: 600, borderRadius: "6px" }} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="#334155">{student.course}</Typography>
                            <Typography variant="caption" sx={{ color: student.gender === "Male" ? "#3b82f6" : "#ec4899" }}>
                              {student.gender}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              icon={<Payments sx={{ fontSize: '14px !important' }} />}
                              label={student.paymentStatus} 
                              size="small" 
                              sx={{ 
                                fontWeight: "bold",
                                bgcolor: student.paymentStatus === "Paid" ? "#ecfdf5" : student.paymentStatus === "Pending" ? "#fffbeb" : "#fef2f2",
                                color: student.paymentStatus === "Paid" ? "#065f46" : student.paymentStatus === "Pending" ? "#92400e" : "#991b1b"
                              }} 
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                              <Tooltip title="Approve Rebate"><IconButton size="small" color="success"><CheckCircle fontSize="small" /></IconButton></Tooltip>
                              <Tooltip title="Details"><IconButton size="small"><InfoOutlined fontSize="small" /></IconButton></Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                          <Typography variant="body2" color="text.secondary">No students found matching "{searchQuery}"</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid>

        {/* 4. Sidebar: Empty Rooms & System Status */}
        <Grid item xs={12} lg={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Empty Room List */}
            <Card sx={styles.card}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <RoomPreferences color="primary" fontSize="small" />
                  <Typography variant="h6" fontWeight="700">Empty Rooms</Typography>
                </Box>
                <Grid container spacing={1.5}>
                  {emptyRoomList.map((room) => (
                    <Grid item xs={4} key={room}>
                      <Box sx={styles.emptyRoomBox}>{room}</Box>
                    </Grid>
                  ))}
                </Grid>
                <Button fullWidth variant="text" sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}>
                  Allocate New Room
                </Button>
              </CardContent>
            </Card>

            {/* Quick System Note */}
            <Card sx={{ ...styles.card, bgcolor: "#1e293b", color: "#fff" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="700" gutterBottom>System Notice</Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
                  Rebate requests for February will close in 3 days. Ensure all pending approvals are processed.
                </Typography>
                <Divider sx={{ bgcolor: "#334155", mb: 2 }} />
                <Button fullWidth variant="contained" sx={{ bgcolor: "#6366f1", textTransform: 'none' }}>
                  Broadcast Message
                </Button>
              </CardContent>
            </Card>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const Divider = (props) => <Box sx={{ height: '1px', width: '100%', ...props.sx }} />;