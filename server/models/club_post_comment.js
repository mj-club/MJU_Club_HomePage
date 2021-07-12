const Sequelize = require("sequelize");

module.exports = class ClubPostComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "ClubPostComment",
        tableName: "club_post_comment",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // ClubPostComment - User (n:1)
    db.ClubPostComment.belongsTo(db.User, {
      foreignKey: "writer_id",
      targetKey: "id",
    });

    // ClubPostComment - ClubPost (n:1)
    db.ClubPostComment.belongsTo(db.ClubPost, {
      foreignKey: "post_id",
      targetKey: "id",
    });
  }
};
