import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface OrderItemsAttributes {
  ot_id: number;
  loc_id: number;
  table_id: number;
  item_id: number;
  variant_id: number;
  quantity: number;
  total_price: number;
  unit_price: number;
  order_id: number;
  special_instructions: string;
}

// Some fields are auto-generated (optional on creation)
interface OrderItemsCreationAttributes extends Optional<OrderItemsAttributes, "ot_id"> {}

export class OrderItems
  extends Model<OrderItemsAttributes, OrderItemsCreationAttributes>
  implements OrderItemsAttributes
{
  declare ot_id: number;
  declare loc_id: number;
  declare item_id: number;
  declare table_id: number;
  declare quantity: number;
  declare variant_id: number;
  declare total_price: number;
  declare unit_price: number;
  declare order_id: number;
  declare special_instructions: string;
}

export default (sequelize: Sequelize): typeof OrderItems => {
  OrderItems.init(
    {
      ot_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      loc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      table_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      special_instructions: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "order_items",
      engine: "InnoDB",
    }
  );
  return OrderItems;
};
