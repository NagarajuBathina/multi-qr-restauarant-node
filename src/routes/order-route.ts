import express from "express";
import { createOrder, fetchTodayOrders, payBill } from "../controllers/order-controller";
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/fetch-today-orders", fetchTodayOrders);
router.put("/pay-bill", payBill);

export default router;
