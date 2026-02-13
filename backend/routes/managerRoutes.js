import express from "express";
import { getManagerDashboard } from "../controllers/managerController.js";
import { updateHostelSettings } from "../controllers/hostelSettingController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.get(
  "/dashboard",
  protect,
  authorize("manager"),
  getManagerDashboard
);

router.put(
  "/settings",
  protect,
  authorize("manager"),
  updateHostelSettings
);

export default router;
