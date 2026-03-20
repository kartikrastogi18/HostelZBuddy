export const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff 0%, #f8faff 50%, #f0f4ff 100%)",
    p: { xs: 2, sm: 3, md: 4, lg: 5 },
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    "&::before": {
      content: '""',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(ellipse 70% 40% at 10% 10%, rgba(99,102,241,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 85%, rgba(139,92,246,0.05) 0%, transparent 60%)",
      pointerEvents: "none",
      zIndex: 0,
    },
  },

  card: {
    background: "#ffffff",
    border: "1px solid rgba(99,102,241,0.1)",
    borderRadius: { xs: "16px", md: "20px" },
    boxShadow: "0 2px 16px rgba(99,102,241,0.06), 0 1px 4px rgba(0,0,0,0.04)",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid rgba(99,102,241,0.22)",
      boxShadow: "0 6px 28px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.06)",
      transform: "translateY(-2px)",
    },
  },

  actionSidebar: {
    background: "linear-gradient(160deg, #eef2ff 0%, #ffffff 60%)",
    border: "1px solid rgba(99,102,241,0.18)",
    borderRadius: { xs: "16px", md: "20px" },
    boxShadow: "0 4px 20px rgba(99,102,241,0.08)",
    p: { xs: 2.5, sm: 3, md: 3.5 },
    mb: 3,
  },

  statsBox: {
    width: { xs: 40, md: 44 },
    height: { xs: 40, md: 44 },
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  tableHeader: {
    "& .MuiTableCell-root": {
      background: "#f5f7ff",
      color: "#6366f1",
      fontWeight: 700,
      fontSize: { xs: "0.72rem", sm: "0.78rem" },
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      borderBottom: "1px solid rgba(99,102,241,0.1)",
      py: { xs: 1.5, md: 2 },
      px: { xs: 1.5, md: 2.5 },
    },
  },

  btnPrimary: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    borderRadius: "12px",
    fontWeight: 700,
    textTransform: "none",
    color: "#fff",
    fontSize: { xs: "0.82rem", sm: "0.875rem" },
    py: { xs: 1, sm: 1.2 },
    boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
    border: "1px solid rgba(139,92,246,0.2)",
    "&:hover": {
      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
      boxShadow: "0 6px 20px rgba(99,102,241,0.4)",
      transform: "translateY(-1px)",
    },
    "&.Mui-disabled": {
      background: "rgba(99,102,241,0.1)",
      color: "rgba(99,102,241,0.35)",
      border: "1px solid rgba(99,102,241,0.08)",
      boxShadow: "none",
    },
    transition: "all 0.2s ease",
  },

  btnOutline: {
    borderRadius: "12px",
    fontWeight: 700,
    textTransform: "none",
    fontSize: { xs: "0.82rem", sm: "0.875rem" },
    py: { xs: 1, sm: 1.2 },
    borderColor: "rgba(99,102,241,0.35)",
    color: "#6366f1",
    "&:hover": {
      borderColor: "#6366f1",
      background: "rgba(99,102,241,0.06)",
      transform: "translateY(-1px)",
    },
    transition: "all 0.2s ease",
  },
};