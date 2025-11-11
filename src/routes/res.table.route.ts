import express from "express";
import { createRestaurantTable, fetchQrStats } from "../controllers/res.table.controller";
const router = express.Router();

router.post("/create-table", createRestaurantTable);
router.get("/fetch-qr-stats/:table_id", fetchQrStats);

export default router;
