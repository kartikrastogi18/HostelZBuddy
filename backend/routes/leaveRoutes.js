import express from "express";
import {
  applyLeave,
  updateLeaveStatus,
  getMyLeaves,
  getHostelLeaves
} from "../controllers/leaveController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student"), applyLeave);


router.get("/my", protect, authorize("student"), getMyLeaves);


router.get("/hostel", protect, authorize("manager"), getHostelLeaves);


router.put("/:leave_id",
  protect,
  authorize("manager"),
  updateLeaveStatus
);

export default router;
