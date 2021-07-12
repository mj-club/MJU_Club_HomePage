const Sequelize = require("sequelize");

module.exports = class ClubPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        category_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        limited_content: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        set_top: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        visit_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "ClubPost",
        tableName: "club_posts",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // ClubPost - ClubInfo (n:1)
    db.ClubPost.belongsTo(db.ClubInfo, {
      foreignKey: "writer_id",
      targetKey: "id",
    });

    // ClubPost - ClubPostComment (1:n)
    db.ClubPost.hasMany(db.ClubPostComment, {
      foreignKey: "post_id",
      sourceKey: "id",
    });
  }
};
