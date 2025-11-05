import { Sequelize } from "sequelize";

import RestauarantModel from "../models/restaurant_model";
import RestaurantTableModel from "../models/res_tables_model";
import RestauarantUsersModel from "../models/res_users_model";
import TableCartModel from "../models/table_cart_model";
import CartItemsModel from "../models/cart_items_model";
import LocationModel from "../models/locations_model";
import MenuCategoryModel from "../models/menu_categories_table";
import MenuItemsModel from "../models/menu_items_model";
import ItemVariantsModel from "../models/item_variants_model";
import OrdersModel from "../models/orders_model";
import OrderItmesModel from "../models/order_items_model";
import PaymentsModel from "../models/payments_model";

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
