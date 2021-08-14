const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { // 제목
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        category: { // 종류 - category: announcement[공지사항], questions[문의게시판], freeBoard[자유게시판], petitions[청원게시판]
          type: Sequelize.STRING(45), 
          allowNull: false,
        },
        thumbnail: { // 썸네일 (게시물 목록에서 미리보기 같은 것)
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        content: { // 내용 
          type: Sequelize.TEXT,
          allowNull: true,
        },
        set_top: { // 상단 고정 여부 1: 상단 고정 허용, 0: 상단 고정 비허용
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        visit_count: { // 조회수
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment_count: { // 댓글수
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        thumb_count: { // 좋아요수
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
