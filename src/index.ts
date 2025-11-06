import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./misc/db";
import { globalErrorHandler } from "./middleware/global.error";

import SubscriptionRoute from "./routes/subscription.route";
import RestaurantRoute from "./routes/restaurant.route";
import LocationRoute from "./routes/location.route";
import TabelRoute from "./routes/res.table.route";
import CategoryRoute from "./routes/category.route";
import ItemRoute from "./routes/item.route";
import OrderRoute from "./routes/order.route";
import UserRoute from "./routes/user.route";
import AuthRoute from "./routes/auth.route";

const app = express();
const PORT = 1537;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(SubscriptionRoute);
app.use(RestaurantRoute);
app.use(LocationRoute);
app.use(TabelRoute);
app.use(CategoryRoute);
app.use(ItemRoute);
app.use(OrderRoute);
app.use(UserRoute);
app.use(AuthRoute);

// must be at the very end!
app.use(globalErrorHandler);

app.get("/", async (req: Request, res: Response) => {
  try {
    await connectDB();
    console.log("Connection successful.");
    return res.status(200).json({ message: "API working fine!" });
  } catch (e) {
    return res.status(500).send("couldnt connect to database");
  }
});

//server running
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
