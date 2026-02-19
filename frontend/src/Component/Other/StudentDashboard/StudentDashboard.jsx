import React, { useMemo } from "react";
// Add AssignmentReturn, ReceiptLong, and CheckCircle here:
import { 
  AssignmentReturn, 
  ReceiptLong, 
  CheckCircle 
} from "@mui/icons-material";

import { Box, Grid } from "@mui/material";

import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import BillHistoryTable from "./BillHistoryTable";
import ActionSidebar from "./ActionSidebar";
import { styles } from "./DashboardStyles";
// 1. CLEAN THE DATA: Use numbers, not strings
const billHistory = [
  { month: "January 2024", amount: 3100, rebate: "3 Days", status: "Unpaid" },
  { month: "December 2023", amount: 2950, rebate: "5 Days", status: "Paid" },
];

export default function StudentDashboard() {
  const hasAppliedThisMonth = true; 

  // 2. CALCULATION: This now works because amount is a number
  const totalBalance = useMemo(() => {
    return billHistory
        .filter(bill => bill.status === "Unpaid")
        .reduce((acc, curr) => acc + curr.amount, 0);
    }, [billHistory]);

  const hasDues = totalBalance > 0;
  const canApplyRebate = !hasDues && !hasAppliedThisMonth;

  // 3. STATUS MESSAGE: Use toLocaleString for pretty formatting
  const statusMessage = useMemo(() => {
      if (totalBalance > 0) {
          return `Rebate Locked: Please clear your outstanding balance of ₹${totalBalance.toLocaleString()} to apply.`;
      }
      if (hasAppliedThisMonth) {
          return "Limit Reached: You have already submitted a rebate request for this month.";
      }
      return "Eligible: You can now apply for your mess rebate.";
  }, [totalBalance, hasAppliedThisMonth]);

  // 4. STATS: Add the ₹ symbol back here for the display
  const studentStats = [
      { title: "Rebates Used", value: "04", subtitle: "Semester Total", icon: <AssignmentReturn sx={{ color: "#6366f1" }} />, bgColor: "#eef2ff" },
      { 
        title: "Current Bill", 
        value: `₹${totalBalance.toLocaleString()}`, 
        subtitle: hasDues ? "Payment Required" : "No pending dues", 
        icon: <ReceiptLong sx={{ color: hasDues ? "#ef4444" : "#f59e0b" }} />, 
        bgColor: hasDues ? "#fef2f2" : "#fffbeb" 
      },
      { title: "Active Fines", value: "₹0.00", subtitle: "No penalties", icon: <CheckCircle sx={{ color: "#10b981" }} />, bgColor: "#ecfdf5" }
  ];

  return (
    <Box sx={styles.container}>
      <DashboardHeader name="Rahul Sharma" room="A-203" />
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8.2}>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {studentStats.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <StatCard item={item} index={index} styles={styles} />
              </Grid>
            ))}
          </Grid>
          <BillHistoryTable billHistory={billHistory} styles={styles} />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <ActionSidebar 
            canApplyRebate={canApplyRebate} 
            statusMessage={statusMessage} 
            styles={styles} 
            totalBalance={totalBalance} // Passing this helps if you want to show it on the pay button
          />
        </Grid>
      </Grid>
    </Box>
  );
}