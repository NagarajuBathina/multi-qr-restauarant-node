import express from "express";
import { createCategory, fetchCategories } from "../controllers/category_controller";
const router = express.Router();

router.post("/create-category", createCategory);
router.get("/fetch-categories/:loc_id", fetchCategories);

export default router;
