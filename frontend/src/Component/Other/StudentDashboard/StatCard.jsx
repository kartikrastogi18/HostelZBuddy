import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const StatCard = ({ item, index, styles }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
    style={{ height: "100%" }}
  >
    <Card sx={{ ...styles.card, height: "100%" }}>
      {/* Top accent line */}
      <Box
        sx={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${item.accentColor || "#6366f1"}, transparent)`,
          opacity: 0.5,
        }}
      />

      <CardContent
        sx={{
          p: { xs: 2.5, sm: 3, md: 3.5 },
          "&:last-child": { pb: { xs: 2.5, sm: 3, md: 3.5 } },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: { xs: 2, md: 2.5 } }}>
          <Box
            sx={{
              ...styles.statsBox,
              bgcolor: item.bgColor,
              border: `1px solid ${item.accentColor || "#6366f1"}22`,
              borderRadius: "12px",
            }}
          >
            {item.icon}
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: "#9ca3af",
              fontWeight: 700,
              fontSize: { xs: "0.65rem", sm: "0.7rem" },
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              textAlign: "right",
              maxWidth: 90,
              lineHeight: 1.3,
            }}
          >
            {item.subtitle}
          </Typography>
        </Box>

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

        <Typography
          variant="body2"
          sx={{ color: "#6b7280", fontWeight: 500, fontSize: { xs: "0.78rem", sm: "0.82rem" } }}
        >
          {item.title}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

export default StatCard;