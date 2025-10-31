import connectDB from "../misc/db";
import { Request, Response } from "express";

// Note: locations are nothing but a restaurant (or) branch of a restaurant

export const createLocation = async (req: Request, res: Response) => {
  const { Location } = await connectDB();
  try {
    await Location.create(req.body);
    return res.status(201).json({ message: "Location created successfully", success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "internal server error" });
  }
};
