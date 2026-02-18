import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import { createHostel, getAllHostels } from "../controllers/hostelController.js";
const router=express.Router();
router.post("/",protect,authorize("super_admin"),createHostel);
router.get("/public", getAllHostels);

export default router;