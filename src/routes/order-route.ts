import express from "express";
import {
  createOrder,
  fetchTodayOrders,
  payBill,
  fetchOrderDetails,
  confirmBill,
} from "../controllers/order-controller";
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/fetch-today-orders", fetchTodayOrders);
router.put("/pay-bill", payBill);
router.get("/get-order-details/:order_id", fetchOrderDetails);
router.patch("/confirm-bill/:order_id", confirmBill);

export default router;
