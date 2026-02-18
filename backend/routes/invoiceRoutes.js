import express from "express";
import { downloadInvoice } from "../controllers/invoiceController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/:payment_id",
  protect,
  authorize("student"),
  downloadInvoice
);

export default router;
