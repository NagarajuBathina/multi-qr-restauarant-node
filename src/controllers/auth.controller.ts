import connectDB from "../misc/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs"; // for clean date handling
import { AppError } from "../apperror";

const JWT_TOKEN = "multi.qr.2025.secretkey";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { RestaurantUsers, Location } = await connectDB();
  const { email, password } = req.body;
  try {
    const user = await RestaurantUsers.findOne({ where: { email } });
    if (!user) throw new AppError("User not found", 404);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new AppError("invalid credentilas", 401);

    const location = await Location.findOne({ where: { loc_id: user.loc_id } });
    if (!location) throw new AppError("Invalid location", 404);

    // Check subscription validity
    const expiryDate = location.subscription_expires_at;
    const now = dayjs();
    const expiry = dayjs(expiryDate);

    if (now.isAfter(expiry)) throw new AppError("Subscription expired. Please renew your plan.", 400);

    let payload = {
      user_id: user.res_user_id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_TOKEN, { expiresIn: "1d" });
    return res.status(200).json({ message: "Login successful", success: true, token, user: payload });
  } catch (e) {
    next(e);
  }
};
