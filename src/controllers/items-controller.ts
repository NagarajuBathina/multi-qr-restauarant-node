import connectDB from "../misc/db";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../apperror";

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
  const { MenuItems } = await connectDB();
  const { cate_id, loc_id, name } = req.body;
  try {
    const checkItem = await MenuItems.findOne({ where: { cate_id, loc_id, name: name } });
    if (checkItem) throw new AppError("Item already existed for this category", 400);
    await MenuItems.create(req.body);
    return res.status(201).json({ message: "Item created successfylly", success: true });
  } catch (e) {
    next(e);
  }
};

export const fetchItems = async (req: Request, res: Response, next: NextFunction) => {
  const { MenuItems, MenuCategory } = await connectDB();
  const limit = parseInt((req.query.limit as string) || "10", 10);
  const page = parseInt((req.query.page as string) || "1", 10);

  try {
    const offset = (page - 1) * limit;

    const items = await MenuItems.findAndCountAll({
      where: { loc_id: Number(req.params.loc_id) },
      limit: page === 0 ? undefined : limit,
      offset: page === 0 ? undefined : offset,
      raw: true,
      nest: true,
      include: {
        model: MenuCategory,
        attributes: ["name"],
      },
    });

    if (!items || items.count === 0) {
      return res.status(200).json({
        message: "no items found",
        success: false,
        data: [],
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
      });
    }

    return res.status(200).json({
      message: "Fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(items.count / limit),
      totalProducts: items.count,
      data: items.rows,
      loc_id: req.params.loc_id,
    });
  } catch (e) {
    next(e);
  }
};
