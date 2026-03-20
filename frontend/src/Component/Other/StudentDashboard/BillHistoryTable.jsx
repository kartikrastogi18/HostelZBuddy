import React from "react";
import {
  Card, Box, Typography, Button,
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, Chip, useMediaQuery, useTheme,
} from "@mui/material";
import { ReceiptLongOutlined } from "@mui/icons-material";

const BillHistoryTable = ({ billHistory, styles }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ ...styles.card, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 3, md: 3.5 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(99,102,241,0.08)",
          background: "linear-gradient(90deg, #f5f7ff, #fff)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36,
              borderRadius: "10px",
              bgcolor: "rgba(99,102,241,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <ReceiptLongOutlined sx={{ color: "#6366f1", fontSize: 18 }} />
          </Box>
          <Typography
            variant="h6"
            fontWeight="800"
            sx={{ color: "#1e1b4b", fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }}
          >
            Payment History
          </Typography>
        </Box>
        <Button
          size="small"
          variant="text"
          sx={{
            color: "#6366f1",
            fontWeight: 700,
            textTransform: "none",
            fontSize: { xs: "0.75rem", sm: "0.8rem" },
            px: 1.5, py: 0.5,
            borderRadius: "8px",
            "&:hover": { bgcolor: "rgba(99,102,241,0.06)" },
          }}
        >
          View Statement
        </Button>
      </Box>

      {/* Table */}
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: { xs: 340, sm: "auto" } }}>
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell>Billing Cycle</TableCell>
              {!isMobile && <TableCell>Amount</TableCell>}
              <TableCell>{isMobile ? "Amt / Rebate" : "Rebate"}</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billHistory.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": { bgcolor: "#f5f7ff" },
                  borderBottom: "1px solid rgba(99,102,241,0.06)",
                  transition: "background 0.15s",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    py: { xs: 1.75, md: 2.25 },
                    px: { xs: 1.5, md: 2.5 },
                    borderBottom: "none",
                  }}
                >
                  {row.month}
                </TableCell>

                {!isMobile && (
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#1e1b4b",
                      fontSize: { xs: "0.78rem", sm: "0.875rem" },
                      py: { xs: 1.75, md: 2.25 },
                      px: { xs: 1.5, md: 2.5 },
                      borderBottom: "none",
                    }}
                  >
                    ₹{row.amount.toLocaleString()}
                  </TableCell>
                )}

                <TableCell
                  sx={{
                    color: "#6b7280",
                    fontSize: { xs: "0.75rem", sm: "0.82rem" },
                    py: { xs: 1.75, md: 2.25 },
                    px: { xs: 1.5, md: 2.5 },
                    borderBottom: "none",
                  }}
                >
                  {isMobile ? (
                    <Box>
                      <Typography sx={{ color: "#1e1b4b", fontWeight: 700, fontSize: "0.78rem" }}>
                        ₹{row.amount.toLocaleString()}
                      </Typography>
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.72rem" }}>
                        {row.rebate}
                      </Typography>
                    </Box>
                  ) : row.rebate}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    py: { xs: 1.75, md: 2.25 },
                    px: { xs: 1.5, md: 2.5 },
                    borderBottom: "none",
                  }}
                >
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: row.status === "Paid" ? "#ecfdf5" : "#fef2f2",
                      color: row.status === "Paid" ? "#059669" : "#dc2626",
                      border: `1px solid ${row.status === "Paid" ? "rgba(5,150,105,0.2)" : "rgba(220,38,38,0.2)"}`,
                      fontWeight: 800,
                      fontSize: { xs: "0.62rem", sm: "0.65rem" },
                      px: { xs: 0.5, sm: 1 },
                      height: { xs: 22, sm: 24 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default BillHistoryTable;