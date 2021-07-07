const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        position: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Club_member",
        tableName: "club_members",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};