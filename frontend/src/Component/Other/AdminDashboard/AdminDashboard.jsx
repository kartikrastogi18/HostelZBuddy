import React, { useState } from "react";
import {
  Box, Grid, Card, CardContent, Typography,
  Divider, Button, Avatar, useMediaQuery, useTheme,
} from "@mui/material";
import { MeetingRoom, People, Feedback, Campaign } from "@mui/icons-material";
import { motion } from "framer-motion";
import StatsCard from "./StatsCard";
import ResidentTable from "./ResidentTable";
import RoomDialog from "./RoomDialog";
import AddStudentModal from "./AddStudentModal";
import StudentDetailsModal from "./StudentDetailsModal";

const adminStats = [
  { title: "Empty Rooms", value: "12", subtitle: "Click to view", icon: <MeetingRoom sx={{ color: "#10b981", fontSize: 20 }} />, bgColor: "rgba(16,185,129,0.08)", accentColor: "#10b981", clickable: true },
  { title: "Total Students", value: "138", subtitle: "Active Residents", icon: <People sx={{ color: "#6366f1", fontSize: 20 }} />, bgColor: "rgba(99,102,241,0.08)", accentColor: "#6366f1", clickable: false },
  { title: "Open Complaints", value: "03", subtitle: "High Priority", icon: <Feedback sx={{ color: "#ef4444", fontSize: 20 }} />, bgColor: "rgba(239,68,68,0.08)", accentColor: "#ef4444", clickable: false },
];

export const emptyRoomList = ["A-102", "A-205", "B-110", "B-302", "C-101", "C-204", "D-105", "D-202"];

const studentDirectoryMock = [
  { name: "Rahul Sharma", room: "A-203", course: "B.Tech CSE", gender: "Male", joinDate: "Aug 2023", paymentStatus: "Paid" },
  { name: "Aditi Verma", room: "B-105", course: "M.B.A", gender: "Female", joinDate: "July 2023", paymentStatus: "Pending" },
  { name: "Siddharth J.", room: "A-110", course: "B.Sc Physics", gender: "Male", joinDate: "Sept 2023", paymentStatus: "Paid" },
  { name: "Priya Singh", room: "C-201", course: "B.A English", gender: "Female", joinDate: "Aug 2022", paymentStatus: "Overdue" },
  { name: "Amit Patel", room: "B-302", course: "B.Tech ME", gender: "Male", joinDate: "Jan 2024", paymentStatus: "Paid" },
  { name: "Sneha Kapur", room: "C-104", course: "B.Des", gender: "Female", joinDate: "Dec 2023", paymentStatus: "Pending" },
];

export default function AdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchQuery, setSearchQuery] = useState("");
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [residents, setResidents] = useState(studentDirectoryMock);

  const handleViewDetails = (student) => { setSelectedStudent(student); setIsDetailsOpen(true); };
  const handleAddStudent = (newStudent) => setResidents([newStudent, ...residents]);

  const filteredResidents = residents.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff 0%, #f8faff 50%, #f0f4ff 100%)",
        p: { xs: 2, sm: 3, md: 4, lg: 5 },
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse 70% 40% at 10% 10%, rgba(99,102,241,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 85%, rgba(139,92,246,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      {/* Dot grid texture */}
      <Box
        sx={{
          position: "fixed", inset: 0,
          backgroundImage: "radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
              mb: { xs: 3, sm: 4, md: 5 },
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: "#6366f1", fontWeight: 700, letterSpacing: "0.15em", fontSize: { xs: "0.65rem", sm: "0.7rem" }, display: "block", mb: 0.5 }}
              >
                Admin Portal
              </Typography>
              <Typography
                variant="h4"
                fontWeight="900"
                sx={{ color: "#1e1b4b", letterSpacing: "-0.03em", fontSize: { xs: "1.4rem", sm: "1.75rem", md: "2.1rem" }, lineHeight: 1.1 }}
              >
                Admin Oversight
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.75, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                Hostel Operations &amp; Resident Management
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: { xs: 40, sm: 46, md: 50 },
                  height: { xs: 40, sm: 46, md: 50 },
                  background: "linear-gradient(135deg, #1e1b4b, #4338ca)",
                  fontWeight: 800,
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  boxShadow: "0 4px 14px rgba(30,27,75,0.25)",
                  border: "2px solid rgba(99,102,241,0.2)",
                }}
              >
                AD
              </Avatar>
              {!isMobile && (
                <Box>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e1b4b", lineHeight: 1.2 }}>Admin</Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af" }}>Warden Office</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </motion.div>

        {/* ── Stats Cards ── */}
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
          {adminStats.map((item, index) => (
            <StatsCard
              key={index}
              item={item}
              index={index}
              onClick={() => item.clickable && setIsRoomsOpen(true)}
            />
          ))}
        </Grid>

        {/* ── Main Content ── */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>

          {/* Resident Table */}
          <Grid item xs={12} lg={9}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
              <Card
                sx={{
                  background: "#ffffff",
                  border: "1px solid rgba(99,102,241,0.1)",
                  borderRadius: { xs: "16px", md: "20px" },
                  boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
                  overflow: "hidden",
                }}
              >
                <ResidentTable
                  residents={filteredResidents}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onAddClick={() => setIsAddModalOpen(true)}
                  onViewDetails={handleViewDetails}
                />
              </Card>
            </motion.div>
          </Grid>

          {/* System Notice Sidebar */}
          <Grid item xs={12} lg={3}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
              <Card
                sx={{
                  background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 100%)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: { xs: "16px", md: "20px" },
                  boxShadow: "0 4px 20px rgba(30,27,75,0.2)",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #ffca28, transparent)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 34, height: 34,
                        borderRadius: "10px",
                        bgcolor: "rgba(255,202,40,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1px solid rgba(255,202,40,0.25)",
                      }}
                    >
                      <Campaign sx={{ color: "#fbbf24", fontSize: 18 }} />
                    </Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="700"
                      sx={{ color: "#f1f5f9", fontSize: { xs: "0.9rem", sm: "0.95rem" } }}
                    >
                      System Notice
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(241,245,249,0.6)",
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: { xs: "0.78rem", sm: "0.82rem" },
                    }}
                  >
                    Rebate requests for February will close in{" "}
                    <Box component="span" sx={{ color: "#fbbf24", fontWeight: 700 }}>3 days</Box>.
                    Ensure all approvals are processed.
                  </Typography>

                  <Divider sx={{ borderColor: "rgba(99,102,241,0.2)", mb: 3 }} />

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Campaign />}
                    sx={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: { xs: "0.82rem", sm: "0.875rem" },
                      py: { xs: 1, sm: 1.2 },
                      boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        boxShadow: "0 6px 20px rgba(99,102,241,0.45)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    Broadcast Notice
                  </Button>

                  {/* Quick stats inside sidebar */}
                  <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {[
                      { label: "Pending Approvals", value: "07", color: "#fbbf24" },
                      { label: "Today's Check-ins", value: "02", color: "#34d399" },
                    ].map((stat) => (
                      <Box
                        key={stat.label}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: "10px",
                          bgcolor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Typography sx={{ color: "rgba(241,245,249,0.6)", fontSize: "0.78rem" }}>
                          {stat.label}
                        </Typography>
                        <Typography sx={{ color: stat.color, fontWeight: 800, fontSize: "0.9rem" }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Dialogs */}
      <RoomDialog open={isRoomsOpen} onClose={() => setIsRoomsOpen(false)} rooms={emptyRoomList} />
      <AddStudentModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddStudent} />
      <StudentDetailsModal open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} student={selectedStudent} />
    </Box>
  );
}