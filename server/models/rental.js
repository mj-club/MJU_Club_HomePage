const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        rental_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        rental_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        member_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rental_state: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Rental",
        tableName: "rentals",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};