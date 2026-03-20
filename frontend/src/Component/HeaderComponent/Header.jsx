import { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #0a0f2e 0%, #1a237e 50%, #0d1b5e 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 202, 40, 0.15)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,202,40,0.1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #ffca28, #ffd54f, transparent)",
          },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              py: { xs: 0.75, sm: 1, md: 1.25 },
              minHeight: { xs: 60, sm: 68, md: 72 },
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* ── LEFT: Logo ── */}
            <Box sx={{ flexShrink: 0 }}>
              <Logo />
            </Box>

            {/* ── SPACER ── */}
            <Box sx={{ flexGrow: 1 }} />

            {/* ── RIGHT: NavLinks + AuthButtons (desktop only) ── */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <NavLinks />
                <AuthButtons />
              </Box>
            )}

            {/* ── RIGHT: Hamburger only (mobile) ── */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                sx={{
                  color: "#ffca28",
                  border: "1px solid rgba(255,202,40,0.3)",
                  borderRadius: "10px",
                  p: 0.75,
                  "&:hover": {
                    background: "rgba(255,202,40,0.1)",
                    borderColor: "#ffca28",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "80vw", sm: 320 },
            background: "linear-gradient(160deg, #0a0f2e 0%, #1a237e 100%)",
            borderLeft: "1px solid rgba(255,202,40,0.2)",
            boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* ── Drawer: Top header row (Logo + Close) ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
            borderBottom: "1px solid rgba(255,202,40,0.15)",
          }}
        >
          <Logo compact />
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: "#ffca28",
              border: "1px solid rgba(255,202,40,0.3)",
              borderRadius: "8px",
              p: 0.5,
              "&:hover": { background: "rgba(255,202,40,0.1)" },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* ── Drawer: Nav links (Home, Dashboard, etc.) ── */}
        <Box sx={{ flexGrow: 1 }}>
          <NavLinks mobile onNavigate={() => setDrawerOpen(false)} />
        </Box>

        {/* ── Drawer: Bottom section — Login / Avatar ── */}
        <Box>
          <Divider sx={{ borderColor: "rgba(255,202,40,0.15)" }} />
          <Box
            sx={{
              px: 2.5,
              py: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {/* Full-width AuthButtons inside drawer */}
            <AuthButtons drawerMode />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;