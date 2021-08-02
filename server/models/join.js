const Sequelize = require("sequelize");

module.exports = class Join extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        sns_type: { type: Sequelize.STRING(45), allowNull: true },
        sns_link: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Join",
        tableName: "join",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Join - ClubInfo (n:1)
    db.Join.belongsTo(db.ClubInfo, {
      foreignKey: "club_id",
      targetKey: "id",
    });
  }
};
