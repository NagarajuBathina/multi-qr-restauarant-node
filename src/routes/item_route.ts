import express from "express";
import { createItem, fetchItems } from "../controllers/items_controller";
const router = express.Router();

router.post("/create-item", createItem);
router.get("/fetch-items/:loc_id", fetchItems);

export default router;
