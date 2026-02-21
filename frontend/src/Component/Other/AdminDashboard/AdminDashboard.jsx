import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Divider, Button, Avatar } from "@mui/material";
import { MeetingRoom, People, Feedback } from "@mui/icons-material";
import StatsCard from "./StatsCard";
import ResidentTable from "./ResidentTable";
import RoomDialog from "./RoomDialog";
import AddStudentModal from "./AddStudentModal";
import StudentDetailsModal from "./StudentDetailsModal";

// Mock Data
const adminStats = [
  { title: "Empty Rooms", value: "12", subtitle: "Click to view", icon: <MeetingRoom sx={{ color: "#10b981" }} />, bgColor: "#ecfdf5", clickable: true },
  { title: "Total Students", value: "138", subtitle: "Active Residents", icon: <People sx={{ color: "#6366f1" }} />, bgColor: "#eef2ff", clickable: false },
  { title: "Open Complaints", value: "03", subtitle: "High Priority", icon: <Feedback sx={{ color: "#ef4444" }} />, bgColor: "#fef2f2", clickable: false },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailsOpen(true);
  };
  
  // 1. Initialize state with mock data
  const [residents, setResidents] = useState(studentDirectoryMock);

  const handleAddStudent = (newStudent) => {
    setResidents([newStudent, ...residents]); 
  };

  // 2. Filter based on the 'residents' STATE, not the mock array
  const filteredResidents = residents.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: "32px", backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800">Admin Oversight</Typography>
          <Typography color="textSecondary">Hostel Operations & Resident Management</Typography>
        </Box>
        <Avatar sx={{ bgcolor: "#1e293b" }}>AD</Avatar>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {adminStats.map((item, index) => (
          <StatsCard 
            key={index} 
            item={item} 
            index={index} 
            onClick={() => item.clickable && setIsRoomsOpen(true)} 
          />
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <Card sx={{ borderRadius: "16px" }}>
            {/* 3. Pass filteredResidents (state) and the onAddClick prop */}
            <ResidentTable 
              residents={filteredResidents} 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
              onAddClick={() => setIsAddModalOpen(true)}
              onViewDetails={handleViewDetails}
            />
          </Card>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Card sx={{ borderRadius: "16px", bgcolor: "#1e293b", color: "#fff" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight="700">System Notice</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>Rebate requests for February will close in 3 days.</Typography>
              <Divider sx={{ bgcolor: "#334155", mb: 3 }} />
              <Button fullWidth variant="contained" sx={{ bgcolor: "#6366f1" }}>Broadcast</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <RoomDialog open={isRoomsOpen} onClose={() => setIsRoomsOpen(false)} rooms={emptyRoomList} />
      
      <AddStudentModal 
        open={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddStudent} 
      />

      <StudentDetailsModal 
        open={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        student={selectedStudent} 
      />
    </Box>
  );
}