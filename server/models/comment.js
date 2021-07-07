const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        writer_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        post_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(100),
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
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // db.Comment.belongsTo(db.User, {foreignKey: "commenter", targetkey: "id"});
  }
};