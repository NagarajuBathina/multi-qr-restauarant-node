import connectDB from "../misc/db";
import { Request, Response } from "express";

export const createRestaurantTable = async (req: Request, res: Response) => {
  const { RestaurantTable } = await connectDB();
  const { res_id, loc_id, table_number } = req.body;
  try {
    const tableNumber = await RestaurantTable.findOne({ where: { res_id, loc_id, table_number: table_number } });
    if (tableNumber) {
      return res.status(400).json({ message: "Table number already exist." });
    }

    await RestaurantTable.create(req.body);

    return res.status(201).json({ message: "Table created successfully", sucess: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "internal server error" });
  }
};