import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface MenuItemsAttributes {
  item_id: number;
  cate_id: number;
  // res_id: number;
  loc_id: number;
  sku: String; //stock keeping unit
  name: String;
  description: Text;
  short_description: String;
  image_url: Text;
  price: number;
  discount_amount: number;
  item_type: String;
  preparation_time: number;
  tags: String;
  is_available: boolean;
  availability_from: number;
  availability_to: number;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

// Some fields are auto-generated (optional on creation)
interface MenuItemsCreationAttributes extends Optional<MenuItemsAttributes, "item_id"> {}

export class MenuItems extends Model<MenuItemsAttributes, MenuItemsCreationAttributes> implements MenuItemsAttributes {
  declare item_id: number;
  declare cate_id: number;
  declare loc_id: number;
  // declare res_id: number;
  declare sku: String;
  declare name: String;
  declare description: Text;
  declare short_description: String;
  declare image_url: Text;
  declare price: number;
  declare discount_amount: number;
  declare item_type: String;
  declare preparation_time: number;
  declare tags: String;
  declare is_available: boolean;
  declare availability_from: number;
  declare availability_to: number;
  declare display_order: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date | null;
}

export default (sequelize: Sequelize): typeof MenuItems => {
  MenuItems.init(
    {
      item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // res_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      loc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      sku: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      short_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image_url: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      item_type: {
        type: DataTypes.ENUM("tiffin", "non_veg", "vegan", "contains_egg"),
        defaultValue: "non_veg",
      },
      preparation_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 15,
      },
      tags: {
        type: DataTypes.ENUM("popular", "chef_special", "vnewegan"),
        defaultValue: "popular",
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      availability_from: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availability_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      display_order: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "menu_items",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",

      // ✅ enable soft deletes (paranoid mode)
      paranoid: true,
    }
  );
  return MenuItems;
};
