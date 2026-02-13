import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getHostelComplaints,
  updateComplaint
} from "../controllers/complaintController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();



router.post(
  "/",
  protect,
  authorize("student"),
  createComplaint
);

router.get(
  "/my",
  protect,
  authorize("student"),
  getMyComplaints
);


router.get(
  "/hostel",
  protect,
  authorize("manager"),
  getHostelComplaints
);

router.put(
  "/:id",
  protect,
  authorize("manager"),
  updateComplaint
);

export default router;
