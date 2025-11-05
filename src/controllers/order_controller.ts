import connectDB from "../misc/db";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { MenuItems } from "../models/menu_items_model";

export const createOrder = async (req: Request, res: Response) => {
  const { Orders, OrderItems, sequelize } = await connectDB();
  const transaction = await sequelize.transaction();
  const { items, ...orderData } = req.body;
  try {
    const newOrder = await Orders.create(orderData, { transaction });

    if (Array.isArray(items)) {
      for (const item of items) {
        const itemData = {
          item_id: item.item_id,
          quantity: item.quantity,
          price: item.price,
          order_id: newOrder.order_id,
          loc_id: orderData.loc_id,
          table_id: orderData.table_id,
        };
        await OrderItems.create(itemData, { transaction });
      }
    }

    await transaction.commit();
    return res.status(201).json({ message: "Order placed successfully", success: true });
  } catch (e) {
    console.error(e);
    if (transaction) {
      await transaction.rollback();
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchTodayOrders = async (req: Request, res: Response) => {
  const { Orders, OrderItems } = await connectDB();
  const { loc_id, status, table_id } = req.body;
  const limit = parseInt((req.query.limit as string) || "10", 10);
  const page = parseInt((req.query.page as string) || "1", 10);
  try {
    const offset = (page - 1) * limit;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // midnight start
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // next day midnight

    let whereClause: any = {
      loc_id,
      created_at: {
        [Op.gte]: today,
        [Op.lt]: tomorrow,
      },
    };

    if (status) whereClause.status = status;

    if (table_id) whereClause.table_id = table_id;

    const orders = await Orders.findAndCountAll({
      where: whereClause,
      include: {
        model: OrderItems,
        attributes: ["quantity", "price"],
        include: [
          {
            model: MenuItems,
            attributes: ["name", "item_type"],
          },
        ],
      },
      offset: page === 0 ? undefined : offset,
      limit: page === 0 ? undefined : limit,
      raw: true,
      nest: true,
    });

    return res.status(200).json({
      success: true,
      data: orders.rows,
      currenPage: page,
      totalOrders: orders.count,
      totalPages: Math.ceil(orders.count / limit),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "internal server error" });
  }
};
