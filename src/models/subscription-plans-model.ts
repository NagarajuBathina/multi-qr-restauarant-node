import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface SubscriptionPlansAttributes {
  plan_id: number;
  duration: number;
  plan_name: string;
}

// Some fields are auto-generated (optional on creation)
interface PlanCreationAttributes extends Optional<SubscriptionPlansAttributes, "plan_id"> {}

export class SubscriptionPlan
  extends Model<SubscriptionPlansAttributes, PlanCreationAttributes>
  implements SubscriptionPlansAttributes
{
  declare plan_id: number;
  declare duration: number;
  declare plan_name: string;
}

export default (sequelize: Sequelize): typeof SubscriptionPlan => {
  SubscriptionPlan.init(
    {
      plan_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      plan_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "subscription_plans",
      engine: "InnoDB",
    }
  );
  return SubscriptionPlan;
};
