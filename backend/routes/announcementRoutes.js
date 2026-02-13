import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement
} from "../controllers/announcementController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("manager"),
  createAnnouncement
);

router.delete(
  "/:id",
  protect,
  authorize("manager"),
  deleteAnnouncement
);

export default router;
