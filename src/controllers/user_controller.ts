import connectDB from "../misc/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { RestaurantUsers } = await connectDB();
  let { phone, loc_id, password, email, ...rest } = req.body;

  try {
    const exists = await RestaurantUsers.findOne({ where: { phone, email, loc_id } });

    if (exists) {
      return res.status(400).json({ message: "Email/Phone already existed" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    req.body.password = hashPassword;

    await RestaurantUsers.create(req.body);

    return res.status(201).json({ message: "User created successfully", success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
