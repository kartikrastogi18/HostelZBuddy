import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Collapse,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, ErrorOutline, MarkEmailRead } from "@mui/icons-material";
import { collegeDomain } from "./constants";

const ResetPasswordDialog = ({
  open,
  handleClose,
  resetEmail,
  setResetEmail,
  fullScreen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [emailError, setEmailError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!email.endsWith(collegeDomain))
      return `Email must end with ${collegeDomain}`;
    return "";
  };

  const handleSend = () => {
    const error = validateEmail(resetEmail);
    if (error) {
      setEmailError(error);
      setSuccessMsg("");
      return;
    }
    // ✅ All good — show success (replace with real API call)
    setEmailError("");
    setSuccessMsg(`Reset link sent to ${resetEmail}`);
  };

  const handleEmailChange = (e) => {
    setResetEmail(e.target.value);
    // Clear errors on typing
    if (emailError) setEmailError("");
    if (successMsg) setSuccessMsg("");
  };

  const handleDialogClose = () => {
    // Reset local state on close
    setEmailError("");
    setSuccessMsg("");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: { xs: fullScreen ? 0 : 3, sm: 3 },
          p: { xs: 0.5, sm: 1 },
          mx: { xs: 2, sm: "auto" },
        },
      }}
    >
      {/* ── Title row ── */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 0.5,
          fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
          fontWeight: 600,
        }}
      >
        Reset Password
        <IconButton
          onClick={handleDialogClose}
          size="small"
          aria-label="Close dialog"
          sx={{ color: "text.secondary" }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: "12px !important", pb: 1 }}>

        {/* ── Subtitle ── */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1.5,
            fontSize: { xs: "0.78rem", sm: "0.85rem" },
          }}
        >
          Enter your college email and we'll send you a password reset link.
        </Typography>

        {/* ── Error Alert ── */}
        <Collapse in={Boolean(emailError)}>
          <Alert
            severity="error"
            icon={<ErrorOutline fontSize="small" />}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              py: 0.5,
            }}
          >
            {emailError}
          </Alert>
        </Collapse>

        {/* ── Success Alert ── */}
        <Collapse in={Boolean(successMsg)}>
          <Alert
            severity="success"
            icon={<MarkEmailRead fontSize="small" />}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              py: 0.5,
            }}
          >
            {successMsg}
          </Alert>
        </Collapse>

        {/* ── Email Field ── */}
        <TextField
          fullWidth
          label="College Email"
          type="email"
          margin="dense"
          value={resetEmail}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          helperText={
            emailError ? (
              <Box
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 0.4 }}
              >
                <ErrorOutline sx={{ fontSize: "0.82rem" }} />
                {emailError}
              </Box>
            ) : null
          }
          size={isMobile ? "small" : "medium"}
          autoFocus
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
            },
            "& .MuiInputBase-input": {
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
            },
            "& .MuiFormHelperText-root": {
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "0.72rem", sm: "0.78rem" },
            },
          }}
        />
      </DialogContent>

      {/* ── Actions ── */}
      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 2.5 },
          pt: 1,
          gap: 1,
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        <Button
          onClick={handleDialogClose}
          fullWidth={isMobile}
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontSize: { xs: "0.82rem", sm: "0.875rem" },
            py: { xs: 0.9, sm: 1 },
            borderColor: "#1a237e",
            color: "#1a237e",
            "&:hover": { borderColor: "#283593", color: "#283593" },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSend}
          variant="contained"
          fullWidth={isMobile}
          disabled={Boolean(successMsg)}
          sx={{
            borderRadius: 2,
            fontSize: { xs: "0.82rem", sm: "0.875rem" },
            py: { xs: 0.9, sm: 1 },
            backgroundColor: "#1a237e",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#283593" },
            "&:active": { transform: "scale(0.98)" },
            transition: "transform 0.1s ease",
          }}
        >
          Send Reset Link
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordDialog;