const Sequelize = require("sequelize");

module.exports = class Auth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        token: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ttl: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Auth",
        tableName: "auth",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};