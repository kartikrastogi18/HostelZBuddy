import React from "react";
import { Card, Box, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";

const BillHistoryTable = ({ billHistory, styles }) => (
  <Card sx={{ ...styles.card, overflow: "hidden" }}>
    <Box sx={{ p: 3.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6" fontWeight="800" color="#1e293b">Payment History</Typography>
      <Button size="small" variant="text" sx={{ color: "#6366f1", fontWeight: "700", textTransform: "none" }}>View Statement</Button>
    </Box>
    <TableContainer>
      <Table>
        <TableHead sx={styles.tableHeader}>
          <TableRow>
            <TableCell>Billing Cycle</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Rebate</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {billHistory.map((row, index) => (
            <TableRow key={index} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
              <TableCell sx={{ fontWeight: "600", color: "#334155" }}>{row.month}</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>{row.amount}</TableCell>
              <TableCell sx={{ color: "#64748b" }}>{row.rebate}</TableCell>
              <TableCell align="right">
                <Chip 
                  label={row.status} 
                  size="small" 
                  sx={{ 
                    bgcolor: row.status === "Paid" ? "#ecfdf5" : "#fef2f2", 
                    color: row.status === "Paid" ? "#065f46" : "#991b1b", 
                    fontWeight: "800", fontSize: "0.65rem", px: 1 
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

export default BillHistoryTable;