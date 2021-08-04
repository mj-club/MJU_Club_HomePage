const Sequelize = require("sequelize");

module.exports = class EventInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        event_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        event_target: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        event_term: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        event_start: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        event_end: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        event_link: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        event_img: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "EventInfo",
        tableName: "event_info",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // EventInfo - User (n:1)
    db.EventInfo.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  }
};
