import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface RestaurantUsersAttributes {
  res_user_id: number;
  res_id: number;
  loc_id: number;
  email: string;
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

// Some fields are auto-generated (optional on creation)
interface RestaurantUsersCreationAttributes extends Optional<RestaurantUsersAttributes, "res_user_id"> {}

export class RestaurantUsers
  extends Model<RestaurantUsersAttributes, RestaurantUsersCreationAttributes>
  implements RestaurantUsersAttributes
{
  declare res_user_id: number;
  declare res_id: number;
  declare loc_id: number;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare first_name: string;
  declare last_name: string;
  declare role: string;
  declare is_active: boolean;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date | null;
}

export default (sequelize: Sequelize): typeof RestaurantUsers => {
  RestaurantUsers.init(
    {
      res_user_id: {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("restaurant_admin", "manager", "staff", "kitchen_chef"),
        allowNull: false,
        defaultValue: "staff",
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "restaurant_users",
      engine: "InnoDB",

      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return RestaurantUsers;
};
