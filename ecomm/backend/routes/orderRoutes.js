import express from "express";
const router = express.Router();
import { addOrderItems } from "../controllers/OrderController";
import { protect } from "../middleware/authMiddleware";

router.route("/").post(protect, addOrderItems);

export default router;
