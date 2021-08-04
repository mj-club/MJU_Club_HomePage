const Sequelize = require("sequelize");

module.exports = class RentalApply extends Sequelize.Model {
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
        start: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        rental_time: {
          type: Sequelize.INTEGER,
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
        apply_state: {
          type: Sequelize.INTEGER, // 신청 현황 -> 0: 승인대기, 1: 승인, 2: 반려(거절)
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "RentalApply",
        tableName: "rental_apply",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // RentalApply - User (n:1)
    db.RentalApply.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });

    // RentalApply - RentalInfo (n:1)
    db.RentalApply.belongsTo(db.RentalInfo, {
      foreignKey: "room_id",
      targetKey: "id",
    });
  }
};
