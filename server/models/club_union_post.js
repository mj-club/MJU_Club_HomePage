const Sequelize = require("sequelize");

module.exports = class ClubUnionPost extends Sequelize.Model {
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
        limited_content: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        set_top: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        visit_count: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "ClubUnionPost",
        tableName: "club_union_post",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {}
};
