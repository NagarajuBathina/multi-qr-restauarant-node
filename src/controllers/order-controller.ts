import connectDB from "../misc/db";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../apperror";

import { Op, where } from "sequelize";
import { MenuItems } from "../models/menu-items-model";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { Orders, OrderItems, CartItems, RestaurantTable, sequelize } = await connectDB();
  const transaction = await sequelize.transaction();
  const { items, order_id, is_existing_order, ...orderData } = req.body;
  try {
    let orderId;
    if (is_existing_order) {
      orderId = order_id;
      await Orders.update({ subtotal: orderData.subtotal }, { where: { order_id: orderId }, transaction });
    } else {
      const newOrder = await Orders.create(orderData, { transaction });
      orderId = newOrder.order_id;
      await RestaurantTable.update({ status: "occupied" }, { where: { table_id: orderData.table_id }, transaction });
    }

    if (Array.isArray(items)) {
      for (const item of items) {
        const itemData = {
          item_id: item.item_id,
          quantity: item.quantity,
          total_price: item.total_price,
          unit_price: item.unit_price,
          order_id: orderId,
          variant_id: item.variant_id,
          loc_id: orderData.loc_id,
          table_id: orderData.table_id,
          special_instructions: item.special_instructions,
        };
        await OrderItems.create(itemData, { transaction });
      }
    }

    await CartItems.destroy({ where: { loc_id: orderData.loc_id, table_id: orderData.table_id }, transaction });

    await transaction.commit();
    return res.status(201).json({ message: "Order placed successfully", success: true });
  } catch (e) {
    console.error(e);
    if (transaction) {
      await transaction.rollback();
    }
    next(e);
  }
};

export const fetchTodayOrders = async (req: Request, res: Response, next: NextFunction) => {
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

    status ? (whereClause.status = status) : (whereClause.status = { [Op.or]: ["Pending", "Preparing"] });

    if (table_id) whereClause.table_id = table_id;

    const orders = await Orders.findAndCountAll({
      where: whereClause,
      include: {
        model: OrderItems,
        attributes: ["quantity", "total_price", "unit_price", "special_instructions"],
        include: [
          {
            model: MenuItems,
            attributes: ["name", "item_type", "item_id"],
          },
        ],
      },
      offset: page === 0 ? undefined : offset,
      limit: page === 0 ? undefined : limit,
      order: [["created_at", "DESC"]],
      // raw: true,
      // nest: true,
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
    next(e);
  }
};

export const payBill = async (req: Request, res: Response, next: NextFunction) => {
  const { Orders, OrderItems, MenuItems, sequelize } = await connectDB();
  const transaction = await sequelize.transaction();
  const { order_id, ...rest } = req.body;

  try {
    const fetchOrder = await Orders.findOne({
      where: order_id,
      // include: [
      //   {
      //     model: OrderItems,
      //     attributes: ["item_id", "quantity", "total_price"],
      //     include: [{ model: MenuItems, attributes: ["name"] }],
      //   },
      // ],
    });
    if (!fetchOrder) throw new AppError("Invalid order id", 400);

    await fetchOrder.update({ ...rest }, { transaction });
    // await RestaurantTable.update({ status: "available" }, { where: { table_id }, transaction });
    await transaction.commit();
    return res.status(200).json({ message: "Bill generated successfully", success: true });
  } catch (e) {
    if (transaction) await transaction.rollback();
    console.error(e);
    next(e);
  }
};

export const fetchOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
  const { Orders, OrderItems, MenuItems } = await connectDB();
  const { order_id } = req.params;
  try {
    const details = await Orders.findOne({
      where: { order_id },
      include: [
        {
          model: OrderItems,
          attributes: ["item_id", "quantity", "total_price"],
          include: [{ model: MenuItems, attributes: ["name"] }],
        },
      ],
    });
    if (!details) throw new AppError("Invalid order id", 400);
    return res.status(200).json({ success: true, data: details });
  } catch (e) {
    next(e);
  }
};

export const confirmBill = async (req: Request, res: Response, next: NextFunction) => {
  const { Orders, RestaurantTable, sequelize } = await connectDB();
  const transaction = await sequelize.transaction();
  const { order_id } = req.params;
  const { status, payment_type } = req.body;

  console.log(req.body);
  try {
    const fetchOrder = await Orders.findOne({
      where: { order_id },
    });
    if (!fetchOrder) throw new AppError("Invalid order id", 400);

    await fetchOrder.update({ status, payment_type }, { transaction });
    await RestaurantTable.update({ status: "available" }, { where: { table_id: fetchOrder.table_id }, transaction });
    await transaction.commit();
    return res.status(200).json({ success: true });
  } catch (e) {
    if (transaction) await transaction.rollback();
    next(e);
  }
};
