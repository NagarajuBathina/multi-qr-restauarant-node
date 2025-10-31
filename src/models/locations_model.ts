import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface LocationsAttributes {
  loc_id: number;
  res_id: number;
  tax_id: String;
  tax: number;
  phone: String;
  line1: Text;
  line2: Text;
  street: String;
  city: String;
  state: String;
  zip_code: number;
  is_active: boolean;
  no_of_tables: number;
  payment_gateway: String;
  subscription_tier: String;
  subscription_expires_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

// Some fields are auto-generated (optional on creation)
interface LocationCreationAttributes extends Optional<LocationsAttributes, "loc_id"> {}

export class Location extends Model<LocationsAttributes, LocationCreationAttributes> implements LocationsAttributes {
  declare loc_id: number;
  declare res_id: number;
  declare tax_id: String;
  declare tax: number;
  declare phone: String;
  declare line1: Text;
  declare line2: Text;
  declare street: String;
  declare city: String;
  declare state: String;
  declare zip_code: number;
  declare is_active: boolean;
  declare no_of_tables: number;
  declare payment_gateway: String;
  declare subscription_tier: String;
  declare subscription_expires_at?: Date | null;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date | null;
}

export default (sequelize: Sequelize): typeof Location => {
  Location.init(
    {
      loc_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      res_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tax_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      phone: {
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
      no_of_tables: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payment_gateway: {
        type: DataTypes.ENUM("quickpay", "upi", "visa", "applepay"),
        defaultValue: "upi",
      },
      subscription_tier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subscription_expires_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "locations",
      engine: "InnoDB",

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",

      // ✅ enable soft deletes (paranoid mode)
      paranoid: true,
    }
  );
  return Location;
};
