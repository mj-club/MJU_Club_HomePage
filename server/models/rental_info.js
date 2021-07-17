const Sequelize = require("sequelize");

module.exports = class RentalInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        rental_state: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        room_img: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "RentalInfo",
        tableName: "rental_info",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // RentalInfo - RentalApply (1:n)
    db.RentalInfo.hasMany(db.RentalApply, {
      foreignKey: "room_id",
      sourceKey: "id",
    });
  }
};
