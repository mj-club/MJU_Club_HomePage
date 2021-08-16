const Sequelize = require("sequelize");

module.exports = class Sns extends Sequelize.Model {
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
        modelName: "Sns",
        tableName: "sns",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Sns - ClubInfo (n:1)
    db.Sns.belongsTo(db.ClubInfo, {
      foreignKey: "club_id",
      targetKey: "id",
    });
  }
};
