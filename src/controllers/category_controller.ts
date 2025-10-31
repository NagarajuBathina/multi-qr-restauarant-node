import connectDB from "../misc/db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  const { MenuCategory } = await connectDB();
  const { loc_id, name } = req.body;
  try {
    const checkCategory = await MenuCategory.findOne({ where: { loc_id, name } });
    if (checkCategory) {
      return res.status(400).json({ message: "Category already exist." });
    }
    await MenuCategory.create(req.body);
    return res.status(201).json({ message: "Category created successfully", success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const fetchCategories = async (req: Request, res: Response) => {
  const { MenuCategory } = await connectDB();
  try {
    const categories = await MenuCategory.findAll({ where: { loc_id: req.params.loc_id } });
    return res.status(200).json({ message: "fetched successfully", success: true, data: categories });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
