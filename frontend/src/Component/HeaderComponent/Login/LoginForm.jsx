import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="College Email"
        name="email"
        type="email"
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography
        variant="body2"
        align="right"
        sx={{
          mt: 1,
          cursor: "pointer",
          color: "#1a237e",
          fontWeight: 500,
        }}
        onClick={openResetDialog}
      >
        Forgot Password?
      </Typography>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.2,
          borderRadius: 2,
          backgroundColor: "#1a237e",
          fontWeight: 600,
          "&:hover": { backgroundColor: "#283593" },
        }}
      >
        Login
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#1a237e",
            fontWeight: 600,
          }}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
