const Sequelize = require("sequelize");

module.exports = class ClubMember extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        position: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "ClubMember",
        tableName: "club_members",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
};
