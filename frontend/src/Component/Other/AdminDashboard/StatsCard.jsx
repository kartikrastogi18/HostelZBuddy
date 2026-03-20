import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

const StatsCard = ({ item, index, onClick }) => (
  <Grid item xs={12} sm={6} md={4}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      <Card
        onClick={onClick}
        sx={{
          height: "100%",
          background: "#ffffff",
          border: "1px solid rgba(99,102,241,0.1)",
          borderRadius: { xs: "16px", md: "20px" },
          boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
          cursor: item.clickable ? "pointer" : "default",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": item.clickable
            ? {
                border: "1px solid rgba(99,102,241,0.28)",
                boxShadow: "0 8px 28px rgba(99,102,241,0.12)",
                transform: "translateY(-4px)",
              }
            : {
                border: "1px solid rgba(99,102,241,0.18)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.08)",
              },
        }}
      >
        {/* Top accent line */}
        <Box
          sx={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${item.accentColor || "#6366f1"}, transparent)`,
            opacity: 0.55,
          }}
        />

        <CardContent
          sx={{
            p: { xs: 2.5, sm: 3, md: 3.5 },
            "&:last-child": { pb: { xs: 2.5, sm: 3, md: 3.5 } },
          }}
        >
          {/* Icon + subtitle row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: { xs: 2, md: 2.5 } }}>
            <Box
              sx={{
                width: { xs: 40, md: 44 },
                height: { xs: 40, md: 44 },
                borderRadius: "12px",
                bgcolor: item.bgColor,
                border: `1px solid ${item.accentColor || "#6366f1"}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: item.clickable ? "#6366f1" : "#9ca3af",
                fontWeight: 700,
                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textAlign: "right",
                lineHeight: 1.3,
              }}
            >
              {item.subtitle}
            </Typography>
          </Box>

          {/* Value */}
          <Typography
            variant="h4"
            fontWeight="800"
            sx={{
              color: "#1e1b4b",
              fontSize: { xs: "1.5rem", sm: "1.6rem", md: "1.75rem" },
              letterSpacing: "-0.02em",
              lineHeight: 1,
              mb: 0.75,
            }}
          >
            {item.value}
          </Typography>

          {/* Label */}
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", fontWeight: 500, fontSize: { xs: "0.78rem", sm: "0.82rem" } }}
          >
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  </Grid>
);

export default StatsCard;