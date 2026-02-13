import express from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import { createHostel, getAllHostels } from "../controllers/hostelController";
const router=express.Router();
router.post("/",protect,authorize("super_admin"),createHostel);
router.get("/",protect,authorize("super_admin"),getAllHostels);
export default router;