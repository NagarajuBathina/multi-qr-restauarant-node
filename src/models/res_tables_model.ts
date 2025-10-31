import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface RestaurantTablesAttributes {
  table_id: number;
  res_id: number;
  loc_id: number;
  table_number: String;
  table_position: String;
  // qr_code: String;
  capacity: number;
  table_type: String;
  status: String;
  is_active: boolean;
  last_cleaned_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

// Some fields are auto-generated (optional on creation)
interface RestaurantTablesCreationAttributes extends Optional<RestaurantTablesAttributes, "table_id"> {}

export class RestaurantTable
  extends Model<RestaurantTablesAttributes, RestaurantTablesCreationAttributes>
  implements RestaurantTablesAttributes
{
  declare table_id: number;
  declare res_id: number;
  declare loc_id: number;
  declare table_number: String;
  declare table_position: String;
  // declare qr_code: String;
  declare capacity: number;
  declare table_type: String;
  declare status: String;
  declare is_active: boolean;
  declare last_cleaned_at?: Date;
  declare created_at?: Date;
  declare updated_at?: Date;
}

export default (sequelize: Sequelize): typeof RestaurantTable => {
  RestaurantTable.init(
    {
      table_id: {
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
      table_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      table_position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // qr_code: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      last_cleaned_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      table_type: {
        type: DataTypes.ENUM("dining", "bar", "counter", "outdoor"),
        defaultValue: "dining",
      },
      status: {
        type: DataTypes.ENUM("available", "occupied", "reserved", "cleaning", "out_of_order"),
        defaultValue: "available",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "restaurant_tables",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return RestaurantTable;
};
