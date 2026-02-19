import React from "react";
import { Box, Typography, Tooltip, Button, Divider, Card, CardContent } from "@mui/material";
import { AssignmentReturn, AccountBalanceWallet, ErrorOutline, SupportAgent, InfoOutlined } from "@mui/icons-material";

const ActionSidebar = ({ canApplyRebate, statusMessage, styles }) => (
  <Box>
    <Box sx={styles.actionSidebar}>
      <Typography variant="h6" fontWeight="800" sx={{ mb: 1 }}>Terminal</Typography>
      <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4 }}>Manage hostel requests</Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Tooltip title={statusMessage} arrow placement="left">
          <span>
            <Button variant="contained" fullWidth disabled={!canApplyRebate} startIcon={<AssignmentReturn />} sx={styles.btnPrimary}>
              Request Rebate
            </Button>
          </span>
        </Tooltip>
        <Button variant="outlined" fullWidth startIcon={<AccountBalanceWallet />} sx={styles.btnOutline}>
          Pay Balance
        </Button>
        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.06)" }} />
        <Button variant="text" startIcon={<ErrorOutline fontSize="small" />} sx={{ color: "#fca5a5", justifyContent: "flex-start", textTransform: "none" }}>
          Raise Complaint
        </Button>
        <Button variant="text" startIcon={<SupportAgent fontSize="small" />} sx={{ color: "#94a3b8", justifyContent: "flex-start", textTransform: "none" }}>
          Contact Warden
        </Button>
      </Box>
    </Box>

    <Card sx={{ ...styles.card, border: "1px dashed #e2e8f0", boxShadow: "none" }}>
      <CardContent sx={{ p: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <InfoOutlined sx={{ color: "#6366f1", fontSize: 20 }} />
          <Typography variant="subtitle2" fontWeight="800">Rebate Policy</Typography>
        </Box>
        <Box component="ul" sx={{ pl: 2, m: 0, '& li': { color: "#64748b", fontSize: "0.78rem", mb: 1.5 } }}>
          <li>Maximum **1 request** per calendar month.</li>
          <li>Requires **zero previous dues** to enable.</li>
          <li>Subject to Warden approval.</li>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default ActionSidebar;