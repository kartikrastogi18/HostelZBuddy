import express from "express";
import { getMyHostelStudents } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/students",
  protect,
  authorize("manager"),
  getMyHostelStudents
);

export default router;
