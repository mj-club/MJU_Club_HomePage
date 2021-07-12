const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        rental_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        rental_state: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rental_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        rental_time: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        rep_member_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        member_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Rental_apply",
        tableName: "rental_applies",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.Rental_info, {foreignKey: "userId"});
  }
};