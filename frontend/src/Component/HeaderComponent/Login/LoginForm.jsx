import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Alert,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff, ErrorOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const LoginForm = ({
  formData,
  errors,
  showPassword,
  setShowPassword,
  handleChange,
  handleSubmit,
  openResetDialog,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Collect all active error messages into one list for the summary Alert
  const errorMessages = Object.values(errors).filter(Boolean);
  const hasErrors = errorMessages.length > 0;

  return (
    <Box component="form" onSubmit={handleSubmit}>

      {/* ✅ Summary Alert — shown when any field has an error */}
      <Collapse in={hasErrors}>
        <Alert
          severity="error"
          icon={<ErrorOutline fontSize={isMobile ? "small" : "medium"} />}
          sx={{
            mb: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            fontSize: { xs: "0.78rem", sm: "0.85rem", md: "0.875rem" },
            alignItems: "flex-start",
            "& .MuiAlert-message": { pt: "2px" },
          }}
        >
          <strong>Please fix the following:</strong>
          <Box
            component="ul"
            sx={{ m: 0, mt: 0.5, pl: 2, listStyleType: "disc" }}
          >
            {errorMessages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </Box>
        </Alert>
      </Collapse>

      {/* ✅ Role Dropdown */}
      <TextField
        select
        fullWidth
        label="Login As"
        name="role"
        margin="normal"
        value={formData.role || ""}
        onChange={handleChange}
        error={Boolean(errors.role)}
        helperText={
          errors.role ? (
            <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
              <ErrorOutline sx={{ fontSize: "0.85rem" }} />
              {errors.role}
            </Box>
          ) : null
        }
        size={isMobile ? "small" : "medium"}
        sx={fieldStyles}
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>

      {/* ✅ College Email */}
      <TextField
        fullWidth
        label="College Email"
        name="email"
        type="email"
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={
          errors.email ? (
            <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
              <ErrorOutline sx={{ fontSize: "0.85rem" }} />
              {errors.email}
            </Box>
          ) : null
        }
        size={isMobile ? "small" : "medium"}
        sx={fieldStyles}
      />

      {/* ✅ Password */}
      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={
          errors.password ? (
            <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
              <ErrorOutline sx={{ fontSize: "0.85rem" }} />
              {errors.password}
            </Box>
          ) : null
        }
        size={isMobile ? "small" : "medium"}
        sx={fieldStyles}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size={isMobile ? "small" : "medium"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* ✅ Forgot Password */}
      <Typography
        variant="body2"
        align="right"
        sx={{
          mt: { xs: 0.75, sm: 1 },
          cursor: "pointer",
          color: "#1a237e",
          fontWeight: 500,
          fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
          py: { xs: 0.5, sm: 0 },
          display: "inline-block",
          width: "100%",
          textAlign: "right",
          userSelect: "none",
        }}
        onClick={openResetDialog}
      >
        Forgot Password?
      </Typography>

      {/* ✅ Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size={isMobile ? "medium" : "large"}
        sx={{
          mt: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.2, md: 1.4 },
          borderRadius: 2,
          backgroundColor: "#1a237e",
          fontWeight: 600,
          fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
          letterSpacing: { xs: 0.5, md: 0.75 },
          "&:hover": { backgroundColor: "#283593" },
          "&:active": { transform: "scale(0.98)" },
          transition: "transform 0.1s ease",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

// Shared responsive field styles
const fieldStyles = {
  "& .MuiInputLabel-root": {
    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
  },
  "& .MuiFormHelperText-root": {
    fontSize: { xs: "0.72rem", sm: "0.78rem" },
    display: "flex",
    alignItems: "center",
  },
};

export default LoginForm;