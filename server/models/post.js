const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(45), // 공지사항, 문의게시판
          allowNull: false,
        },
        thumbnail: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        set_top: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        visit_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        thumb_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Post",
        tableName: "posts",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Post - User (n:1)
    db.Post.belongsTo(db.User, {
      foreignKey: "writer_id",
      targetKey: "id",
    });

    // Post - ClubInfo (n:1)
    db.Post.belongsTo(db.ClubInfo, {
      foreignKey: "club_id",
      targetKey: "id",
    });

    // Post - UnionInfo (n:1)
    db.Post.belongsTo(db.UnionInfo, {
      foreignKey: "union_id",
      targetKey: "id",
    });

    // // Post - thumb - User (n:m)
    // db.Post.belongsToMany(db.User, { through: db.Thumb });

    // Post - PostComment (1:n)
    db.Post.hasMany(db.Comment, {
      foreignKey: "post_id",
      sourceKey: "id",
    });

    // Post - File (1:n)
    db.Post.hasMany(db.File, {
      foreignKey: "post_id",
      sourceKey: "id",
    });
  }
};
