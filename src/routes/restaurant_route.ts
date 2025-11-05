import express from "express";
import { createRestaurant ,fetchRestaurants} from "../controllers/restaurant_controller";
const router = express.Router();

router.post("/create-restaurant", createRestaurant);
router.get("/fetch-restaurants",fetchRestaurants); // super admin

export default router;
