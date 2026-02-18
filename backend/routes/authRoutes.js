import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";
router.post(
  "/create-student",
  protect,
  authorize("manager"),
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validateRequest,
  register
);


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
