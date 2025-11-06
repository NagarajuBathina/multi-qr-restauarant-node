import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface ItemVariantsAttributes {
  variant_id: number;
  item_id: number;
  name: string;
  item_type: string;
  price: number;
}

// Some fields are auto-generated (optional on creation)
interface ItemVariantsCreationAttributes extends Optional<ItemVariantsAttributes, "variant_id"> {}

export class ItemVariants
  extends Model<ItemVariantsAttributes, ItemVariantsCreationAttributes>
  implements ItemVariantsAttributes
{
  declare variant_id: number;
  declare item_id: number;
  declare name: string;
  declare item_type: string;
  declare price: number;
}

export default (sequelize: Sequelize): typeof ItemVariants => {
  ItemVariants.init(
    {
      variant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue:0
      },

      item_type: {
        type: DataTypes.ENUM("Small", "Medium", "Large"),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "item_variants",
      engine: "InnoDB",
    }
  );
  return ItemVariants;
};
