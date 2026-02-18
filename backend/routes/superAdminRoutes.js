import express from "express";
import { getSuperAdminDashboard } from "../controllers/superAdminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("super_admin"),
  getSuperAdminDashboard
);

export default router;
