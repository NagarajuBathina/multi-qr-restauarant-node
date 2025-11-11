import express from "express";
import { addToCart, removeFromCart, clearCart } from "../controllers/cart.controller";
const router = express.Router();

router.post("/add-to-cart", addToCart);
router.patch("/remove-from-cart", removeFromCart);
router.delete("/clear-cart", clearCart);

export default router;
