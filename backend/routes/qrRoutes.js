import express from "express";
import { generateMealQR } from "../controllers/qrController.js";
import { scanMealQR } from "../controllers/attendanceController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post(
  "/generate",
  protect,
  authorize("manager"),
  generateMealQR
);


router.post(
  "/scan",
  protect,
  authorize("student"),
  scanMealQR
);

export default router;
