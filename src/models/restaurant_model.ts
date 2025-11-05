import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface RestaurantAttributes {
  res_id: number;
  res_name: string;
  email: string;
  phone: string;
  line1: Text;
  line2: Text;
  street: string;
  city: string;
  state: string;
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
  declare res_name: string;
  declare email: string;
  declare phone: string;
  declare line1: Text;
  declare line2: Text;
  declare street: string;
  declare city: string;
  declare state: string;
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
        type: DataTypes.BIGINT,
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
