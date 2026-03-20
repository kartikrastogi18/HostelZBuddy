import React from "react";
import {
  Box, Typography, Tooltip, Button,
  Divider, Card, CardContent, Alert,
  useMediaQuery, useTheme,
} from "@mui/material";
import {
  AssignmentReturn, AccountBalanceWallet,
  ErrorOutline, SupportAgent, InfoOutlined, LockOutlined,
} from "@mui/icons-material";

const ActionSidebar = ({ canApplyRebate, statusMessage, styles, totalBalance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

      {/* ── Action Terminal Card ── */}
      <Box sx={styles.actionSidebar}>
        <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
          <Typography
            variant="h6"
            fontWeight="800"
            sx={{
              color: "#1e1b4b",
              fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
            }}
          >
            Quick Actions
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#9ca3af", mt: 0.4, fontSize: { xs: "0.75rem", sm: "0.8rem" } }}
          >
            Manage your hostel requests
          </Typography>
        </Box>

        {/* Status Alert */}
        <Alert
          severity={canApplyRebate ? "success" : totalBalance > 0 ? "error" : "warning"}
          icon={canApplyRebate ? undefined : <LockOutlined fontSize="small" />}
          sx={{
            mb: 2.5,
            borderRadius: "10px",
            fontSize: { xs: "0.72rem", sm: "0.76rem" },
            py: 0.75,
          }}
        >
          {statusMessage}
        </Alert>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Tooltip title={statusMessage} arrow placement={isMobile ? "top" : "left"}>
            <span>
              <Button
                variant="contained"
                fullWidth
                disabled={!canApplyRebate}
                startIcon={<AssignmentReturn />}
                sx={styles.btnPrimary}
              >
                Request Rebate
              </Button>
            </span>
          </Tooltip>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AccountBalanceWallet />}
            sx={styles.btnOutline}
          >
            Pay Balance
            {totalBalance > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 1, px: 1, py: 0.25,
                  bgcolor: "rgba(220,38,38,0.08)",
                  color: "#dc2626",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  border: "1px solid rgba(220,38,38,0.15)",
                }}
              >
                ₹{totalBalance.toLocaleString()}
              </Box>
            )}
          </Button>

          <Divider sx={{ borderColor: "rgba(99,102,241,0.1)", my: 0.5 }} />

          <Button
            variant="text"
            startIcon={<ErrorOutline fontSize="small" />}
            sx={{
              color: "#ef4444",
              justifyContent: "flex-start",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.85rem" },
              borderRadius: "10px",
              px: 1.5, py: 0.75,
              "&:hover": { bgcolor: "rgba(239,68,68,0.06)" },
            }}
          >
            Raise Complaint
          </Button>

          <Button
            variant="text"
            startIcon={<SupportAgent fontSize="small" />}
            sx={{
              color: "#6b7280",
              justifyContent: "flex-start",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.85rem" },
              borderRadius: "10px",
              px: 1.5, py: 0.75,
              "&:hover": { bgcolor: "rgba(99,102,241,0.06)", color: "#6366f1" },
            }}
          >
            Contact Warden
          </Button>
        </Box>
      </Box>

      {/* ── Rebate Policy Card ── */}
      <Card
        sx={{
          ...styles.card,
          border: "1px dashed rgba(99,102,241,0.25)",
          boxShadow: "none",
          "&:hover": { transform: "none", boxShadow: "none" },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 }, "&:last-child": { pb: { xs: 2.5, md: 3 } } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 32, height: 32,
                borderRadius: "8px",
                bgcolor: "rgba(99,102,241,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <InfoOutlined sx={{ color: "#6366f1", fontSize: 17 }} />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight="800"
              sx={{ color: "#1e1b4b", fontSize: { xs: "0.85rem", sm: "0.875rem" } }}
            >
              Rebate Policy
            </Typography>
          </Box>

          <Box
            component="ul"
            sx={{
              pl: 2, m: 0,
              "& li": {
                color: "#6b7280",
                fontSize: { xs: "0.75rem", sm: "0.78rem" },
                mb: 1.25,
                lineHeight: 1.6,
                "&::marker": { color: "#6366f1" },
              },
            }}
          >
            <li>
              Maximum{" "}
              <Box component="strong" sx={{ color: "#6366f1" }}>1 request</Box>{" "}
              per calendar month.
            </li>
            <li>
              Requires{" "}
              <Box component="strong" sx={{ color: "#6366f1" }}>zero previous dues</Box>{" "}
              to enable.
            </li>
            <li>Subject to Warden approval.</li>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActionSidebar;