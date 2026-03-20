import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Avatar, Box, Typography, Chip, Tooltip,
  IconButton, TextField, InputAdornment, Button,
  useMediaQuery, useTheme,
} from "@mui/material";
import { Add, Search, CheckCircle, InfoOutlined } from "@mui/icons-material";

const paymentColors = {
  Paid:    { bg: "#ecfdf5", color: "#059669", border: "rgba(5,150,105,0.2)" },
  Pending: { bg: "#fffbeb", color: "#d97706", border: "rgba(217,119,6,0.2)" },
  Overdue: { bg: "#fef2f2", color: "#dc2626", border: "rgba(220,38,38,0.2)" },
};

const ResidentTable = ({ residents, searchQuery, onSearchChange, onAddClick, onViewDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>

      {/* ── Header row ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          mb: { xs: 2.5, md: 3 },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight="800"
            sx={{ color: "#1e1b4b", fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }}
          >
            Resident Directory
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: { xs: "0.72rem", sm: "0.75rem" } }}>
            {residents.length} residents found
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <TextField
            placeholder="Search name or room..."
            size="small"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "260px", md: "300px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#f5f7ff",
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                "& fieldset": { borderColor: "rgba(99,102,241,0.15)" },
                "&:hover fieldset": { borderColor: "rgba(99,102,241,0.3)" },
                "&.Mui-focused fieldset": { borderColor: "#6366f1" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#9ca3af", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAddClick}
            fullWidth={isMobile}
            sx={{
              background: "linear-gradient(135deg, #1e1b4b, #312e81)",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: { xs: "0.82rem", sm: "0.875rem" },
              whiteSpace: "nowrap",
              py: { xs: 1, sm: 1.1 },
              px: { xs: 2, sm: 2.5 },
              boxShadow: "0 4px 14px rgba(30,27,75,0.2)",
              "&:hover": {
                background: "linear-gradient(135deg, #312e81, #4338ca)",
                boxShadow: "0 6px 18px rgba(30,27,75,0.3)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      {/* ── Table ── */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid rgba(99,102,241,0.1)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: { xs: 500, sm: "auto" } }}>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  bgcolor: "#f5f7ff",
                  color: "#6366f1",
                  fontWeight: 700,
                  fontSize: { xs: "0.68rem", sm: "0.72rem" },
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(99,102,241,0.1)",
                  py: { xs: 1.5, md: 2 },
                  px: { xs: 1.5, md: 2.5 },
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableCell>Student</TableCell>
              <TableCell>Room</TableCell>
              {!isMobile && <TableCell>Course</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {residents.map((student, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": { bgcolor: "#f5f7ff" },
                  borderBottom: "1px solid rgba(99,102,241,0.06)",
                  transition: "background 0.15s",
                  "&:last-child td": { borderBottom: "none" },
                }}
              >
                {/* Student cell */}
                <TableCell
                  sx={{
                    py: { xs: 1.5, md: 2 },
                    px: { xs: 1.5, md: 2.5 },
                    borderBottom: "none",
                  }}
                >
                  <Box
                    onClick={() => onViewDetails(student)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                      "&:hover .student-name": { color: "#6366f1", textDecoration: "underline" },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {student.name ? student.name[0] : "?"}
                    </Avatar>
                    <Box>
                      <Typography
                        className="student-name"
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          color: "#1e1b4b",
                          fontSize: { xs: "0.78rem", sm: "0.82rem" },
                          transition: "color 0.2s",
                          lineHeight: 1.3,
                        }}
                      >
                        {student.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: { xs: "0.68rem", sm: "0.72rem" } }}>
                        Joined {student.joinDate || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* Room */}
                <TableCell sx={{ py: { xs: 1.5, md: 2 }, px: { xs: 1.5, md: 2.5 }, borderBottom: "none" }}>
                  <Chip
                    label={student.room}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      borderRadius: "8px",
                      bgcolor: "rgba(99,102,241,0.08)",
                      color: "#4f46e5",
                      border: "1px solid rgba(99,102,241,0.18)",
                      fontSize: { xs: "0.68rem", sm: "0.72rem" },
                      height: { xs: 22, sm: 24 },
                    }}
                  />
                </TableCell>

                {/* Course (hidden on mobile) */}
                {!isMobile && (
                  <TableCell sx={{ py: { xs: 1.5, md: 2 }, px: { xs: 1.5, md: 2.5 }, borderBottom: "none" }}>
                    <Typography variant="body2" sx={{ color: "#374151", fontSize: "0.82rem", fontWeight: 500 }}>
                      {student.course}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: student.gender === "Male" ? "#3b82f6" : "#ec4899",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      {student.gender}
                    </Typography>
                  </TableCell>
                )}

                {/* Status */}
                <TableCell sx={{ py: { xs: 1.5, md: 2 }, px: { xs: 1.5, md: 2.5 }, borderBottom: "none" }}>
                  {(() => {
                    const c = paymentColors[student.paymentStatus] || paymentColors.Pending;
                    return (
                      <Chip
                        label={student.paymentStatus}
                        size="small"
                        sx={{
                          bgcolor: c.bg,
                          color: c.color,
                          border: `1px solid ${c.border}`,
                          fontWeight: 800,
                          fontSize: { xs: "0.62rem", sm: "0.65rem" },
                          height: { xs: 22, sm: 24 },
                          px: { xs: 0.5, sm: 1 },
                        }}
                      />
                    );
                  })()}
                </TableCell>

                {/* Actions */}
                <TableCell align="right" sx={{ py: { xs: 1.5, md: 2 }, px: { xs: 1.5, md: 2.5 }, borderBottom: "none" }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                    <Tooltip title="Approve">
                      <IconButton
                        size="small"
                        sx={{
                          color: "#10b981",
                          bgcolor: "rgba(16,185,129,0.06)",
                          borderRadius: "8px",
                          "&:hover": { bgcolor: "rgba(16,185,129,0.12)" },
                          width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 },
                        }}
                      >
                        <CheckCircle sx={{ fontSize: { xs: 15, sm: 17 } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => onViewDetails(student)}
                        sx={{
                          color: "#6366f1",
                          bgcolor: "rgba(99,102,241,0.06)",
                          borderRadius: "8px",
                          "&:hover": { bgcolor: "rgba(99,102,241,0.12)" },
                          width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 },
                        }}
                      >
                        <InfoOutlined sx={{ fontSize: { xs: 15, sm: 17 } }} />
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
};

export default ResidentTable;