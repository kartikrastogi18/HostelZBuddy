import express from "express";
import { generateMonthlyBill } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  authorize("student"),
  generateMonthlyBill
);

export default router;
