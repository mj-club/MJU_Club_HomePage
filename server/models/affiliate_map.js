const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        map_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        map_content: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Affiliate_map",
        tableName: "affiliate_maps",
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