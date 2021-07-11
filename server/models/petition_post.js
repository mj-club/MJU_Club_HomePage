const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        limited_content: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING('long'),
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
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        edited_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        password: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Petition_post",
        tableName: "petition_posts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};