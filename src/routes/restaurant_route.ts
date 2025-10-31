import express from "express";
import { createRestaurant } from "../controllers/restaurant_controller";
const router = express.Router();

router.post("/create-restaurant", createRestaurant);

export default router;
