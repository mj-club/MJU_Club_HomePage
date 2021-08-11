const Sequelize = require("sequelize");

module.exports = class Schedule extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
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
  }
};
