import { Sequelize } from "sequelize";

// import AppModel from "../models/app_model";

// associations
// import setupAssociations from "../associations";

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

// const App = AppModel(sequelize);


const Models = {

};

// setupAssociations(Models);

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
