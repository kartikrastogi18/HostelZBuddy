import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const ResetPasswordDialog = ({
  open,
  handleClose,
  resetEmail,
  setResetEmail,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Enter College Email"
          margin="normal"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained">Send Reset Link</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordDialog;