const Sequelize = require("sequelize");

module.exports = class PetitionPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "PetitionPost",
        tableName: "petition_post",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // PetitionPost - User (n:1)
    db.PetitionPost.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  }
};
