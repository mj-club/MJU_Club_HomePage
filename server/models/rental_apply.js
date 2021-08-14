const Sequelize = require("sequelize");

module.exports = class RentalApply extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_name: { // 공간 및 물품명
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        rental_date: { // 대여 날짜
          type: Sequelize.DATE,
          allowNull: false,
        },
        start: { // 대여 시작일 
          type: Sequelize.DATE,
          allowNull: false,
        },
        end: { // 대여 종료일
          type: Sequelize.DATE,
          allowNull: false,
        },
        rental_time: { // 대여 시간 
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rep_member_name: { // 대표자 명
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        member_count: { // 대표자를 포함한 이용인원수
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
