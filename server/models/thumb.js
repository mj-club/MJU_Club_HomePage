const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        check_at: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Thumb",
        tableName: "thumbs",
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