import connectDB from "../misc/db";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../apperror";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { RestaurantUsers } = await connectDB();
  let { phone, loc_id, password, email, ...rest } = req.body;

  try {
    const exists = await RestaurantUsers.findOne({ where: { phone, email, loc_id } });

    if (exists) throw new AppError("Email/Phone already existed", 400);

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    req.body.password = hashPassword;

    await RestaurantUsers.create(req.body);

    return res.status(201).json({ message: "User created successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { RestaurantUsers } = await connectDB();
  const { res_user_id } = req.params;
  let { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const [updated] = await RestaurantUsers.update({ password: hashPassword }, { where: { res_user_id } });
    if (updated === 0) throw new AppError("User not found", 404);
    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (e) {
    next(e);
  }
};
