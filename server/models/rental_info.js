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
        room_img: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Rental_info",
        tableName: "rental_infos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Rental_apply);
  }
};