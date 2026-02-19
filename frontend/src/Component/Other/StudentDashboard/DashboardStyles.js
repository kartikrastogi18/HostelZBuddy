// DashboardStyles.js
export const styles = {
  container: { 
    padding: { xs: "16px", md: "40px" }, 
    backgroundColor: "#f8fafc", 
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    mb: 6 
  },
  card: {
    borderRadius: "20px",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -2px rgba(0,0,0,0.02)",
    border: "1px solid #f1f5f9",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": { 
      transform: "translateY(-5px)",
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06)" 
    }
  },
  statsBox: {
    p: 1.5, 
    borderRadius: "14px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center"
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    "& th": { 
      color: "#94a3b8", 
      fontWeight: "700", 
      fontSize: "0.75rem", 
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "2px solid #f1f5f9"
    }
  },
  actionSidebar: {
    background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
    color: "#fff",
    borderRadius: "24px",
    p: 4,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)",
    mb: 3
  },
  btnPrimary: {
    bgcolor: "#6366f1",
    py: 1.6,
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
    "&:hover": { bgcolor: "#4f46e5", boxShadow: "0 6px 20px rgba(99, 102, 241, 0.23)" },
    "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.1)", color: "#64748b" }
  },
  btnOutline: {
    borderColor: "rgba(255,255,255,0.15)",
    color: "#fff",
    py: 1.4,
    borderRadius: "12px",
    textTransform: "none",
    "&:hover": { borderColor: "#6366f1", bgcolor: "rgba(99, 102, 241, 0.05)" }
  }
};