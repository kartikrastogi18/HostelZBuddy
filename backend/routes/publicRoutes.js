import express from "express";
import { getHostelDetails } from "../controllers/publicController.js";
import { getAllHostels } from "../controllers/hostelController.js";

const router = express.Router();

router.get("/hostels", getAllHostels);
router.get("/hostels/:id", getHostelDetails);

export default router;
