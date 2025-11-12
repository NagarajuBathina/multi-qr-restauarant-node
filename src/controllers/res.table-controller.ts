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

export const fetchQrStats = async (req: Request, res: Response, next: NextFunction) => {
  const { CartItems, MenuItems, RestaurantTable, MenuCategory } = await connectDB();
  const { table_id } = req.params;
  try {
    const table = await RestaurantTable.findOne({
      where: { table_id, is_active: true },
      attributes: ["table_number", "loc_id", "table_id", "res_id"],
    });
    if (!table) {
      throw new AppError("Invalid table id", 400);
    }

    const tableLocaiton = table.loc_id;

    const [items, cartItems] = await Promise.all([
      MenuItems.findAll({
        where: { loc_id: tableLocaiton },
        include: {
          model: MenuCategory,
          attributes: ["name"],
        },
        attributes: {
          exclude: [
            "cate_id",
            "created_at",
            "updated_at",
            "deleted_at",
            "availability_from",
            "availability_to",
            "tags",
            "sku",
          ],
        },
      }),
      CartItems.findAll({
        where: { loc_id: tableLocaiton, table_id: table_id },
        attributes: { exclude: ["created_at", "updated_at"] },
      }),
    ]);

    return res.status(200).json({ success: true, data: { items, cartItems, table } });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
