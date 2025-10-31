import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface TableCartAttributes {
  cart_id: number;
  res_id: number;
  loc_id: number;
  table_id: number;
  subtotal: number;
  tax_amount: number;
  gratuity: number; // tip given to waiter
  total_amount: number;
  item_count: number;
  special_instructions: Text;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Some fields are auto-generated (optional on creation)
interface TableCartCreationAttributes extends Optional<TableCartAttributes, "cart_id"> {}

export class TableCart
  extends Model<TableCartAttributes, TableCartCreationAttributes>
  implements TableCartAttributes
{
  declare cart_id: number;
  declare res_id: number;
  declare loc_id: number;
  declare table_id: number;
  declare subtotal: number;
  declare tax_amount: number;
  declare gratuity: number;
  declare total_amount: number;
  declare item_count: number;
  declare special_instructions: Text;
  declare is_active: boolean;
  declare created_at?: Date;
  declare updated_at?: Date;
}

export default (sequelize: Sequelize): typeof TableCart => {
  TableCart.init(
    {
      cart_id: {
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
      subtotal: {
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
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      item_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      special_instructions: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "table_cart",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",

      paranoid: true,
    }
  );
  return TableCart;
};
