import React, { useMemo } from "react";
import { AssignmentReturn, ReceiptLong, CheckCircle } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import BillHistoryTable from "./BillHistoryTable";
import ActionSidebar from "./ActionSidebar";
import { styles } from "./DashboardStyles";

const billHistory = [
  { month: "January 2024", amount: 3100, rebate: "3 Days", status: "Unpaid" },
  { month: "December 2023", amount: 2950, rebate: "5 Days", status: "Paid" },
];

export default function StudentDashboard() {
  const hasAppliedThisMonth = true;

  const totalBalance = useMemo(() =>
    billHistory
      .filter((b) => b.status === "Unpaid")
      .reduce((acc, curr) => acc + curr.amount, 0),
    []
  );

  const hasDues = totalBalance > 0;
  const canApplyRebate = !hasDues && !hasAppliedThisMonth;

  const statusMessage = useMemo(() => {
    if (totalBalance > 0)
      return `Rebate Locked: Clear outstanding balance of ₹${totalBalance.toLocaleString()} to apply.`;
    if (hasAppliedThisMonth)
      return "Limit Reached: You've already submitted a rebate request this month.";
    return "Eligible: You can now apply for your mess rebate.";
  }, [totalBalance, hasAppliedThisMonth]);

  const studentStats = [
    {
      title: "Rebates Used",
      value: "04",
      subtitle: "Semester Total",
      icon: <AssignmentReturn sx={{ color: "#6366f1", fontSize: 20 }} />,
      bgColor: "rgba(99,102,241,0.08)",
      accentColor: "#6366f1",
    },
    {
      title: "Current Bill",
      value: `₹${totalBalance.toLocaleString()}`,
      subtitle: hasDues ? "Payment Required" : "No pending dues",
      icon: <ReceiptLong sx={{ color: hasDues ? "#ef4444" : "#f59e0b", fontSize: 20 }} />,
      bgColor: hasDues ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)",
      accentColor: hasDues ? "#ef4444" : "#f59e0b",
    },
    {
      title: "Active Fines",
      value: "₹0.00",
      subtitle: "No penalties",
      icon: <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />,
      bgColor: "rgba(16,185,129,0.08)",
      accentColor: "#10b981",
    },
  ];

  return (
    <Box sx={styles.container}>
      {/* Subtle dot-grid texture */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <DashboardHeader name="Rahul Sharma" room="A-203" />

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>

          {/* Main column */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
              {studentStats.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <StatCard item={item} index={index} styles={styles} />
                </Grid>
              ))}
            </Grid>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <BillHistoryTable billHistory={billHistory} styles={styles} />
            </motion.div>
          </Grid>

          {/* Sidebar column */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <ActionSidebar
                canApplyRebate={canApplyRebate}
                statusMessage={statusMessage}
                styles={styles}
                totalBalance={totalBalance}
              />
            </motion.div>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}