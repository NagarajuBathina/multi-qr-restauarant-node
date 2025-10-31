import express from "express";
import { createRestaurantTable } from "../controllers/res_table_controller";
const router = express.Router();

router.post("/create-table", createRestaurantTable);

export default router;
