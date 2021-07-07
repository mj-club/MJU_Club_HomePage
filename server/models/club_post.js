const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        category: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        visit_count: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        edited_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Club_post",
        tableName: "club_posts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};