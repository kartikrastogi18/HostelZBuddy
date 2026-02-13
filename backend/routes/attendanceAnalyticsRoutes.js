import express from "express";
import { getAttendanceAnalytics } from "../controllers/attendanceAnalyticsController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/analytics",
  protect,
  authorize("manager"),
  getAttendanceAnalytics
);

export default router;
