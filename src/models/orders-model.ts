import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface OrdersAttributes {
  order_id: number;
  res_id: number;
  loc_id: number;
  table_id: number;
  order_type: string;
  priority: string;
  subtotal: number;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  gratuity: number;
  total_amount: number;
  estimated_preparation_time: number;
  // cart_id: number; // restauarant cart id
  // is_active: boolean;
  // special_instructions: Text;
  internal_notes: Text;
  status: string;
  cust_name: string; // customer name
  cust_phone: string; //customer phone number
  payment_type: string;
  cancellation_reason: Text;
  cancellation_date_time?: Date;
  created_at?: Date;
  updated_at?: Date;
}

// Some fields are auto-generated (optional on creation)
interface OrdersCreationAttributes extends Optional<OrdersAttributes, "order_id"> {}

export class Orders extends Model<OrdersAttributes, OrdersCreationAttributes> implements OrdersAttributes {
  declare order_id: number;
  declare res_id: number;
  declare loc_id: number;
  declare table_id: number;
  declare order_type: string;
  declare priority: string;
  declare subtotal: number;
  declare discount_amount: number;
  declare tax_amount: number;
  declare tax_rate: number;
  declare total_amount: number;
  declare estimated_preparation_time: number;
  // declare cart_id: number;
  // declare is_active: boolean;
  declare status: string;
  declare gratuity: number;
  declare internal_notes: Text;
  declare cust_name: string;
  declare cust_phone: string;
  declare payment_type: string;
  declare cancellation_date_time?: Date;
  declare cancellation_reason: Text;
  // declare special_instructions: Text;
  declare created_at?: Date;
  declare updated_at?: Date;
}

export default (sequelize: Sequelize): typeof Orders => {
  Orders.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      res_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      table_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_type: {
        type: DataTypes.ENUM("dine_in", "takeaway", "delivery"),
        defaultValue: "dine_id",
      },
      priority: {
        type: DataTypes.ENUM("normal", "high", "urgent"),
        defaultValue: "normal",
      },
      status: {
        type: DataTypes.ENUM("Pending", "Preparing", "Completed", "Cancelled"),
        defaultValue: "Pending",
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      gratuity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      estimated_preparation_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cust_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cust_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_type: {
        type: DataTypes.ENUM("cash", "online"),
        defaultValue: "cash",
      },
      // cart_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // is_active: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      // },
      // special_instructions: {
      //   type: DataTypes.TEXT("long"),
      //   allowNull: false,
      // },
      internal_notes: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      cancellation_date_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cancellation_reason: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "orders",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",

      paranoid: false,
    }
  );
  return Orders;
};
