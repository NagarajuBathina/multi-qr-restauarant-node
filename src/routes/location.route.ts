import express from "express";
import { createLocation } from "../controllers/location.controller";
const router = express.Router();

router.post("/create-location", createLocation);

export default router;
