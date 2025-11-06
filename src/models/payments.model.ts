import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface PaymentsAttributes {
  payment_id: number;
  order_id: number;
  table_id: number;
  loc_id: number;
  res_id: number;
  payment_method: string;
  amount: number;
  transacion_status: string;
  transaction_id: string;
  gateway_response: string;
  confirm_number: number;
  confirmation_response: string;
  processed_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

// Some fields are auto-generated (optional on creation)
interface PaymentsCreationAttributes extends Optional<PaymentsAttributes, "payment_id"> {}

export class Payments extends Model<PaymentsAttributes, PaymentsCreationAttributes> implements PaymentsAttributes {
  declare payment_id: number;
  declare order_id: number;
  declare table_id: number;
  declare loc_id: number;
  declare res_id: number;
  declare amount: number;
  declare payment_method: string;
  declare transacion_status: string;
  declare transaction_id: string;
  declare gateway_response: string;
  declare confirm_number: number;
  declare confirmation_response: string;
  declare processed_at?: Date;
  declare created_at?: Date;
  declare updated_at?: Date;
}

export default (sequelize: Sequelize): typeof Payments => {
  Payments.init(
    {
      payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      table_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      res_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.ENUM("Cash", "Online", "Card"),
        defaultValue: "Cash",
      },
      transacion_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gateway_response: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      confirm_number: {
        type: DataTypes.INTEGER,
      },
      confirmation_response: {
        type: DataTypes.STRING,
      },
      processed_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "payments",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",

      paranoid: true,
    }
  );
  return Payments;
};
