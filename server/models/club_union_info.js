const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        slogan: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        representative: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        deputy_representative: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        organization_chart: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        logo: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Club_union_info",
        tableName: "club_union_infos",
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