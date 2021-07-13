const Sequelize = require("sequelize");

<<<<<<< HEAD
module.exports = class RentalInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_name: {
=======
module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        rental_name: {
>>>>>>> 110f9366e249d843481114fcb8cf24c767da31c0
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        rental_state: {
<<<<<<< HEAD
          type: Sequelize.STRING(45),
=======
          type: Sequelize.INTEGER,
>>>>>>> 110f9366e249d843481114fcb8cf24c767da31c0
          allowNull: false,
        },
        room_img: {
          type: Sequelize.STRING(45),
<<<<<<< HEAD
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
=======
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
>>>>>>> 110f9366e249d843481114fcb8cf24c767da31c0
      }
    );
  }

  static associate(db) {
<<<<<<< HEAD
    // RentalInfo - RentalApply (1:n)
    db.RentalInfo.hasMany(db.RentalApply, {
      foreignKey: "room_id",
      sourceKey: "id",
    });
  }
};
=======
    db.User.hasMany(db.Rental_apply);
  }
};
>>>>>>> 110f9366e249d843481114fcb8cf24c767da31c0
