const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT('long'),
          allowNull: false,
        },
        limited_content: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        set_top: {
          type: Sequelize.BOOLEAN,
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
        visit_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Club_union_post",
        tableName: "club_union_posts",
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