import { Snackbar, Alert, Slide } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const ErrorSnackbar = ({ open, handleClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
