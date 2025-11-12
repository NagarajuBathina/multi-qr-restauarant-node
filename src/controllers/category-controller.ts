import connectDB from "../misc/db";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../apperror";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { MenuCategory } = await connectDB();
  const { loc_id, name } = req.body;
  try {
    const checkCategory = await MenuCategory.findOne({ where: { loc_id, name } });
    if (checkCategory) throw new AppError("Category already exist.", 400);
    await MenuCategory.create(req.body);
    return res.status(201).json({ message: "Category created successfully", success: true });
  } catch (e) {
    next(e);
  }
};

export const fetchCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { MenuCategory } = await connectDB();
  try {
    const categories = await MenuCategory.findAll({ where: { loc_id: req.params.loc_id } });
    return res.status(200).json({ message: "fetched successfully", success: true, data: categories });
  } catch (e) {
    next(e);
  }
};
