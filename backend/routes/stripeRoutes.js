import express from "express";
import {
  createStripeSession,
  verifyStripeSession
} from "../controllers/stripeController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/create-session",
  protect,
  authorize("student"),
  createStripeSession
);

router.get(
  "/verify/:session_id",
  protect,
  authorize("student"),
  verifyStripeSession
);

export default router;
