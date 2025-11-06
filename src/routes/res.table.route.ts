import express from "express";
import { createRestaurantTable } from "../controllers/res.table.controller";
const router = express.Router();

router.post("/create-table", createRestaurantTable);

export default router;
