import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface CartItemsAttributes {
  id: number;
  // cart_id: number;
  loc_id: number;
  table_id: number;
  item_id: number;
  variant_id: number;
  quantity: number;
  unit_price: number; // single item price
  total_price: number;
  special_instructions: Text;
  created_at?: Date;
  updated_at?: Date;
}

// Some fields are auto-generated (optional on creation)
interface CartItemsCreationAttributes extends Optional<CartItemsAttributes, "id"> {}

export class CartItems extends Model<CartItemsAttributes, CartItemsCreationAttributes> implements CartItemsAttributes {
  declare id: number;
  // declare cart_id: number;
  declare loc_id: number;
  declare table_id: number;
  declare item_id: number;
  declare variant_id: number;
  declare quantity: number;
  declare unit_price: number;
  declare total_price: number;
  declare special_instructions: Text;
  declare created_at?: Date;
  declare updated_at?: Date;
}

export default (sequelize: Sequelize): typeof CartItems => {
  CartItems.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // cart_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
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
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      special_instructions: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "cart_items",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",

      paranoid: false,
    }
  );
  return CartItems;
};
