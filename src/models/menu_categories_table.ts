import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface MenuCategoriesAttributes {
  cate_id: number;
  loc_id: number;
  name: string;
  description: Text;
  image_url: Text;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

// Some fields are auto-generated (optional on creation)
interface MenuCategoriesCreationAttributes extends Optional<MenuCategoriesAttributes, "cate_id"> {}

export class MenuCategory
  extends Model<MenuCategoriesAttributes, MenuCategoriesCreationAttributes>
  implements MenuCategoriesAttributes
{
  declare cate_id: number;
  declare loc_id: number;
  declare name: string;
  declare description: Text;
  declare image_url: Text;
  declare display_order: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date | null;
}

export default (sequelize: Sequelize): typeof MenuCategory => {
  MenuCategory.init(
    {
      cate_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      loc_id: {
        type: DataTypes.INTEGER,
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
      image_url: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      display_order: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "menu_categories",
      engine: "InnoDB", //Enables transactions and foreign keys

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",

      // ✅ enable soft deletes (paranoid mode)
      paranoid: true,
    }
  );
  return MenuCategory;
};
