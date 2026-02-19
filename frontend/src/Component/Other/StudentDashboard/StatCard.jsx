import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const StatCard = ({ item, index, styles }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
    <Card sx={styles.card}>
      <CardContent sx={{ p: 3.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Box sx={{ ...styles.statsBox, bgcolor: item.bgColor }}>{item.icon}</Box>
          <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: "700" }}>{item.subtitle}</Typography>
        </Box>
        <Typography variant="h4" fontWeight="800" sx={{ color: "#1e293b" }}>{item.value}</Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5, fontWeight: "500" }}>{item.title}</Typography>
      </CardContent>
    </Card>
  </motion.div>
);

export default StatCard;