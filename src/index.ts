import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./misc/db";

import RestaurantRoute from "./routes/restaurant_route";
import LocationRoute from "./routes/location_route";
import TabelRoute from "./routes/res_table_route";
import CategoryRoute from "./routes/category_route";
import ItemRoute from "./routes/item_route";

const app = express();
const PORT = 1537;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(RestaurantRoute);
app.use(LocationRoute);
app.use(TabelRoute);
app.use(CategoryRoute);
app.use(ItemRoute);

app.get("/", async (req: Request, res: Response) => {
  try {
    await connectDB();
    console.log("Connection successful.");
    return res.status(200).json({ message: "connection successful." });
  } catch (e) {
    return res.status(500).send("couldnt connect to database");
  }
});

//server running
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
