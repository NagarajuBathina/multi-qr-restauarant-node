import express from "express";
import { createSubscriptionPlan, fetchSubscriptions } from "../controllers/subscription-controller";
const router = express.Router();

router.post("/create-sub-plan", createSubscriptionPlan);
router.get("/fetch-subscriptions", fetchSubscriptions);

export default router;
