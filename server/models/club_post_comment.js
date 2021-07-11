const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        edited_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Club_post_comment",
        tableName: "club_post_comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    
  }
};