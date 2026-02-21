import React from "react";
import { Card, CardContent, Typography, Box, Badge, Grid } from "@mui/material";
import { motion } from "framer-motion";

const StatsCard = ({ item, index, onClick }) => (
  <Grid item xs={12} sm={6} md={4}>
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        sx={{ 
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          cursor: item.clickable ? "pointer" : "default",
          transition: "transform 0.2s ease-in-out",
          "&:hover": item.clickable ? { transform: "translateY(-5px)", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" } : {}
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: item.bgColor }}>{item.icon}</Box>
            {item.value !== "00" && <Badge color="error" variant="dot" />}
          </Box>
          <Typography variant="h4" fontWeight="700" sx={{ mt: 2, color: "#1e293b" }}>{item.value}</Typography>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: "600" }}>{item.title}</Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8" }}>{item.subtitle}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  </Grid>
);

export default StatsCard;