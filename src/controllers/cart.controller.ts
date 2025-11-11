import connectDB from "../misc/db";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../apperror";

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { CartItems } = await connectDB();
  const { table_id, loc_id, item_id, unit_price, quantity = 1, ...rest } = req.body;
  try {
    if (!table_id || !loc_id || !item_id || !unit_price) {
      throw new AppError("Missing required fields: table_id, loc_id, item_id, or price", 400);
    }
    // Try to find or create the item in the cart
    const [item, created] = await CartItems.findOrCreate({
      where: { table_id, item_id, loc_id },
      defaults: {
        ...rest,
        quantity,
        unit_price,
        total_price: unit_price * quantity,
      },
    });
    if (!created) {
      // If item exists → increment quantity and total_price atomically
      await item.increment({ quantity: quantity, total_price: unit_price * quantity });
    }
    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  const { CartItems } = await connectDB();
  const { loc_id, table_id, item_id } = req.body;
  try {
    if (!loc_id || !table_id || !item_id) {
      throw new AppError("Missing fields", 400);
    }
    const item = await CartItems.findOne({
      where: { table_id, loc_id, item_id },
    });
    if (!item) {
      throw new AppError("Item not found in the cart", 404);
    }
    if (item.quantity <= 1) {
      await item.destroy();
      return res.status(200).json({ success: true, message: "Item removed from cart" });
    } else {
      const unitPrice = Number(item.unit_price);
      await item.decrement({ quantity: 1, total_price: unitPrice });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  const { CartItems } = await connectDB();
  const { loc_id, table_id } = req.body;
  try {
    await CartItems.destroy({ where: { loc_id, table_id } });
    return res.status(200).json({ success: true, message: "Cart cleared successfully" });
  } catch (e) {
    next(e);
  }
};
