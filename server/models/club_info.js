const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        introdution: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        representation: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        contact_number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        sns: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        infomation: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Club_info",
        tableName: "club_info",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};