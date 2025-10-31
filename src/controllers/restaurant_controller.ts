import { Request, Response } from "express";
import connectDB from "../misc/db";

export const createRestaurant = async (req: Request, res: Response) => {
  const { Restauarant, Location, sequelize } = await connectDB();
  const transaction = await sequelize.transaction();

  try {
    const { restaurantData, locationData, commonData } = req.body;

    const restaurantPayload = {
      ...restaurantData,
      ...commonData,
    };

    const newRestaurant = await Restauarant.create(restaurantPayload, { transaction });

    const locationPayload = {
      ...locationData,
      ...commonData,
      res_id: newRestaurant.res_id,
    };

    await Location.create(locationPayload, { transaction });

    await transaction.commit();
    return res.status(201).json({ success: true, message: "Restaurant created successfully" });
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error(e);
    return res.status(500).json({ message: "internal server error" });
  }
};
