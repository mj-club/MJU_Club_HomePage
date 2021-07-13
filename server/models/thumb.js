const Sequelize = require("sequelize");

module.exports = class Thumb extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        check_at: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Thumb",
        tableName: "thumb",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
};
