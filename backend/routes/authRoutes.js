import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Only super_admin can create manager
router.post(
  "/create-manager",
  protect,
  authorize("super_admin"),
  register
);

// Manager can create student
router.post(
  "/create-student",
  protect,
  authorize("manager"),
  register
);

// Login (public)
router.post("/login", login);

export default router;
