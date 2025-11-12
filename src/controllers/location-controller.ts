import connectDB from "../misc/db";
import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import { AppError } from "../apperror";

// Note: locations are nothing but a restaurant (or) branch of a restaurant

export const createLocation = async (req: Request, res: Response, next: NextFunction) => {
  const { Location, SubscriptionPlans } = await connectDB();
  const { subscription_tier } = req.body;
  try {
    const subscriptionData = await SubscriptionPlans.findOne({ where: subscription_tier });

    if (!subscriptionData) throw new AppError("Plan not found", 404);

    const planDuration = subscriptionData.duration;

    const expiryDate = dayjs().add(planDuration, "day").format("YYYY-MM-DD HH:mm:ss");

    req.body.subscription_expires_at = expiryDate;

    await Location.create(req.body);
    return res.status(201).json({ message: "Location created successfully", success: true });
  } catch (e) {
    next(e);
  }
};