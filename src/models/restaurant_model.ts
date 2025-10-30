import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface RestaurantAttributes {
  res_id: number;
  res_name: String;
  email: String;
  phone: String;
  line1: Text;
  line2: Text;
  street: String;
  city: String;
  state: String;
  zip_code: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

// Some fields are auto-generated (optional on creation)
interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, "res_id"> {}

export class Restaurant
  extends Model<RestaurantAttributes, RestaurantCreationAttributes>
  implements RestaurantAttributes
{
  declare res_id: number;
  declare res_name: String;
  declare email: String;
  declare phone: String;
  declare line1: Text;
  declare line2: Text;
  declare street: String;
  declare city: String;
  declare state: String;
  declare zip_code: number;
  declare is_active: boolean;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date | null;
}

export default (sequelize: Sequelize): typeof Restaurant => {
  Restaurant.init(
    {
      res_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      res_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      line1: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      line2: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "restaurant",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",

      // ✅ enable soft deletes (paranoid mode)
      paranoid: true,
    }
  );
  return Restaurant;
};
