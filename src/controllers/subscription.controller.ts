import connectDB from "../misc/db";
import { AppError } from "../apperror";
import { Request, Response, NextFunction } from "express";

export const createSubscriptionPlan = async (req: Request, res: Response, next: NextFunction) => {
  const { SubscriptionPlans } = await connectDB();
  const { plan_name } = req.body;
  try {
    const isExists = await SubscriptionPlans.findOne({ where: { plan_name } });
    if (isExists) throw new AppError("Plan already exist.", 400);
    await SubscriptionPlans.create(req.body);
    return res.status(201).json({ message: "Plan created successfully", success: true });
  } catch (e) {
    next(e);
  }
};

export const fetchSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
  const { SubscriptionPlans } = await connectDB();
  try {
    const result = await SubscriptionPlans.findAll();
    return res.status(200).json({ data: result, success: true });
  } catch (e) {
    next(e);
  }
};
