import express from "express";
import { createOrder, fetchTodayOrders } from "../controllers/order.controller";
const router = express.Router();

router.post("/create-order", createOrder);
router.get("/fetch-today-orders", fetchTodayOrders);

export default router;
