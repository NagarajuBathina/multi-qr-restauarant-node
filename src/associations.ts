export default function setupAssociations(models: any) {
  const { MenuItems, Location, MenuCategory } = models;

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
}
