import express from "express";
import { createRestaurant ,fetchRestaurants} from "../controllers/restaurant-controller";
const router = express.Router();

router.post("/create-restaurant", createRestaurant);
router.get("/fetch-restaurants",fetchRestaurants); // super admin

export default router;
