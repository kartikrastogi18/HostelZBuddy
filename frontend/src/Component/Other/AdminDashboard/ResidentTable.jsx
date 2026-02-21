import React from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Avatar, Box, Typography, Chip, Tooltip, 
  IconButton, TextField, InputAdornment, Button
} from "@mui/material";
import { Add, Search, CheckCircle, InfoOutlined } from "@mui/icons-material";

const ResidentTable = ({ residents, searchQuery, onSearchChange, onAddClick, onViewDetails }) => (
  <Box sx={{ p: 3 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
      <Typography variant="h6" fontWeight="700">Resident Directory</Typography>
      
      <Box sx={{ display: "flex", gap: 2, flexGrow: { xs: 1, sm: 0 } }}>
        <TextField
          placeholder="Search name or room..."
          size="small"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
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
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={onAddClick}
          sx={{ bgcolor: "#1e293b", borderRadius: "10px", textTransform: "none", whiteSpace: 'nowrap' }}
        >
          Add Student
        </Button>
      </Box>
    </Box>

    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #f1f5f9" }}>
      <Table>
        <TableHead sx={{ bgcolor: "#f8fafc" }}>
          <TableRow>
            <TableCell sx={{ color: "#64748b", fontWeight: "600", fontSize: "0.75rem", textTransform: "uppercase" }}>Student</TableCell>
            <TableCell sx={{ color: "#64748b", fontWeight: "600", fontSize: "0.75rem", textTransform: "uppercase" }}>Room</TableCell>
            <TableCell sx={{ color: "#64748b", fontWeight: "600", fontSize: "0.75rem", textTransform: "uppercase" }}>Course</TableCell>
            <TableCell sx={{ color: "#64748b", fontWeight: "600", fontSize: "0.75rem", textTransform: "uppercase" }}>Status</TableCell>
            <TableCell align="right" sx={{ color: "#64748b", fontWeight: "600", fontSize: "0.75rem", textTransform: "uppercase" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {residents.map((student, index) => (
            <TableRow key={index} hover>
              <TableCell>
                {/* Clicking the name or avatar opens details */}
                <Box 
                  onClick={() => onViewDetails(student)}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    cursor: 'pointer',
                    '&:hover .student-name': { color: '#6366f1', textDecoration: 'underline' }
                  }}
                >
                  <Avatar sx={{ width: 36, height: 36, bgcolor: "#6366f1" }}>
                    {student.name ? student.name[0] : "?"}
                  </Avatar>
                  <Box>
                    <Typography className="student-name" variant="body2" fontWeight="600" sx={{ transition: '0.2s' }}>
                      {student.name}
                    </Typography>
                    <Typography variant="caption" color="#64748b">
                      Joined {student.joinDate || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={student.room} size="small" sx={{ fontWeight: 600, borderRadius: '6px' }} />
              </TableCell>
              <TableCell>
                <Typography variant="body2">{student.course}</Typography>
                <Typography variant="caption" sx={{ color: student.gender === "Male" ? "#3b82f6" : "#ec4899" }}>
                  {student.gender}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={student.paymentStatus} 
                  size="small" 
                  sx={{ 
                    fontWeight: "bold",
                    bgcolor: student.paymentStatus === "Paid" ? "#ecfdf5" : "#fef2f2",
                    color: student.paymentStatus === "Paid" ? "#065f46" : "#991b1b"
                  }} 
                />
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                  <Tooltip title="Approve">
                    <IconButton size="small" color="success">
                      <CheckCircle fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => onViewDetails(student)}>
                      <InfoOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default ResidentTable;