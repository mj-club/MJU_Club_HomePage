const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Comment",
        tableName: "comments",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Comment - User (n:1)
    db.Comment.belongsTo(db.User, {
      foreignKey: "writer_id",
      targetKey: "id",
    });

    // Comment - Post (n:1)
    db.Comment.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
    });
  }
};
