import { AppBar, Container, Toolbar } from "@mui/material";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #1a237e, #283593)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Logo />
          <NavLinks />
          <AuthButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;