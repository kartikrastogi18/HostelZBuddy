import express from "express";
import { upsertMenu, getFullMenu } from "../controllers/menuController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.put(
  "/",
  protect,
  authorize("manager"),
  upsertMenu
);

router.get(
  "/",
  protect,
  authorize("manager"),
  getFullMenu
);

export default router;
