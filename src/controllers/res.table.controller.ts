import connectDB from "../misc/db";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../apperror";

export const createRestaurantTable = async (req: Request, res: Response, next: NextFunction) => {
  const { RestaurantTable, Location } = await connectDB();
  const { res_id, loc_id, table_number } = req.body;
  try {
    const checkTableNumber = await RestaurantTable.findOne({ where: { res_id, loc_id, table_number: table_number } });
    if (checkTableNumber) throw new AppError("Table number already exist.", 400);

    const locationTables = await Location.findOne({ where: loc_id });
    if (!locationTables) throw new AppError("Invalid location ID.", 404);

    const presentTables = await RestaurantTable.count({ where: loc_id });

    if (presentTables == locationTables.no_of_tables)
      throw new AppError("Tables limit already reached for this location.", 400);

    await RestaurantTable.create(req.body);

    return res.status(201).json({ message: "Table created successfully", sucess: true });
  } catch (e) {
    next(e);
  }
};
