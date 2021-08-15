const Sequelize = require("sequelize");

module.exports = class Schedule extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { // 일정명
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: { // 일정 설명
          type: Sequelize.TEXT,
          allowNull: false,
        },
        start: { // 시작일
          type: Sequelize.DATE,
          allowNull: false,
        },
        end: { // 종료일
          type: Sequelize.DATE,
          allowNull: false,
        },
        allDayLong: { // false : 시간지정, true : 하루종일
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Schedule",
        tableName: "schedules",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Schedule - User (n:1)
    db.Schedule.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });

    // Schedule - ClubInfo (n:1)
    db.Schedule.belongsTo(db.ClubInfo, {
      foreignKey: "club_id",
      targetKey: "id",
    });

    // Schedule - UnionInfo (n:1)
    db.Schedule.belongsTo(db.UnionInfo, {
      foreignKey: "union_id",
      targetKey: "id",
    });
  }
};
