import express from "express";
import { getStudentDashboard } from "../controllers/dashboardController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/student",
  protect,
  authorize("student"),
  getStudentDashboard
);

export default router;
