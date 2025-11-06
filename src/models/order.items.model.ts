import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface OrderItemsAttributes {
  ot_id: number;
  loc_id: number;
  table_id: number;
  item_id: number;
  quantity: number;
  price: number;
  order_id: number;
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
  declare price: number;
  declare order_id: number;
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

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      order_id: {
        type: DataTypes.INTEGER,
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
