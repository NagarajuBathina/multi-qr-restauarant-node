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

// fetch all restaurant(locations) for super admin
export const fetchRestaurants = async (req: Request, res: Response) => {
  const { Location } = await connectDB();
  const page = parseInt((req.query.page as string) || "1", 10);
  const limit = parseInt((req.query.limit as string) || "10", 10);
  try {
    const offset = (page - 1) * limit;
    const result = await Location.findAndCountAll({
      limit: page === 0 ? undefined : limit,
      offset: page === 0 ? undefined : offset,
      raw: true,
      nest: true,
    });

    return res.status(200).json({
      success: true,
      data: result.rows,
      currentPage: page,
      totalLocations: result.count,
      totalPages: Math.ceil(result.count / limit),
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
