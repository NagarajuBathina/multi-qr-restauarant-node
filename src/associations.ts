export default function setupAssociations(models: any) {
  const { MenuItems, Location, MenuCategory, Orders, OrderItems } = models;

  MenuItems.belongsTo(MenuCategory, {
    foreignKey: "cate_id",
    targetKey: "cate_id",
    onDelete: "CASCADE",
  });

  Location.hasMany(MenuCategory, {
    foreignKey: "loc_id",
    sourceKey: "loc_id",
    onDelete: "CASCADE",
  });

  Orders.hasMany(OrderItems, {
    foreignKey: "order_id",
    sourceKey: "order_id",
    onDelete: "CASCADE",
  });

  OrderItems.belongsTo(MenuItems, {
    foreignKey: "item_id",
    sourceKey: "item_id",
    onDelete: "CASCADE",
  });

  MenuItems.hasMany(OrderItems, {
    foreignKey: "item_id",
    sourceKey: "item_id",
    onDelete: "CASCADE",
  });
}
