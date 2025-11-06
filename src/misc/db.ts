import { Sequelize } from "sequelize";

import SubscriptionPlansModel from "../models/subscription.plans.model";
import RestauarantModel from "../models/restaurant.model";
import RestaurantTableModel from "../models/res.tables.model";
import RestauarantUsersModel from "../models/res.users.model";
import TableCartModel from "../models/table.cart.model";
import CartItemsModel from "../models/cart.items.model";
import LocationModel from "../models/locations.model";
import MenuCategoryModel from "../models/menu.categories.table";
import MenuItemsModel from "../models/menu.items.model";
import ItemVariantsModel from "../models/item.variants.model";
import OrdersModel from "../models/orders.model";
import OrderItmesModel from "../models/order.items.model";
import PaymentsModel from "../models/payments.model";

// associations
import setupAssociations from "../associations";

const sequelize = new Sequelize("u276789778_qr_multi_rest", "u276789778_qr_multi_rest", "123@Apple@123", {
  dialect: "mysql",
  host: "82.25.121.32",
  port: 3306,
  logging: false,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const SubscriptionPlans = SubscriptionPlansModel(sequelize);
const Restauarant = RestauarantModel(sequelize);
const RestaurantTable = RestaurantTableModel(sequelize);
const RestaurantUsers = RestauarantUsersModel(sequelize);
const TableCart = TableCartModel(sequelize);
const CartItems = CartItemsModel(sequelize);
const Location = LocationModel(sequelize);
const MenuCategory = MenuCategoryModel(sequelize);
const MenuItems = MenuItemsModel(sequelize);
const ItemVariants = ItemVariantsModel(sequelize);
const Orders = OrdersModel(sequelize);
const OrderItems = OrderItmesModel(sequelize);
const Payments = PaymentsModel(sequelize);

const Models = {
  SubscriptionPlans,
  Restauarant,
  RestaurantTable,
  RestaurantUsers,
  TableCart,
  CartItems,
  Location,
  MenuCategory,
  MenuItems,
  ItemVariants,
  Orders,
  OrderItems,
  Payments,
};

setupAssociations(Models);

let isConnected = false;

const connectDB = async () => {
  try {
    if (!isConnected) {
      await sequelize.authenticate();
      isConnected = true;
      console.log("✅ Database connection established.");
    } else {
      console.log("♻️ Reusing existing connection.");
    }
    return { sequelize, ...Models };
  } catch (error) {
    console.error("❌ Error while connecting to database", error);
    throw error;
  }
};

export default connectDB;
