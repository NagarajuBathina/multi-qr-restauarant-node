import connectDB from "../misc/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_TOKEN = "multi.qr.2025.secretkey";

export const loginUser = async (req: Request, res: Response) => {
  const { RestaurantUsers } = await connectDB();
  const { email, password } = req.body;
  try {
    const user = await RestaurantUsers.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "invalid credentilas" });
    }

    let payload = {
      user_id: user.res_user_id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_TOKEN, { expiresIn: "1d" });
    return res.status(200).json({ message: "Login successful", success: true, token, user: payload });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "internal server error" });
  }
};
