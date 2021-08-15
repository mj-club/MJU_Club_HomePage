const Sequelize = require("sequelize");

module.exports = class EventInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        event_name: { // 이벤트명
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        event_target: { // 이벤트 대상
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        title: { // 게시물 제목
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        content: { // 내용 
          type: Sequelize.TEXT,
          allowNull: true,
        },
        event_term: { // 기간 
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        event_start: { // 이벤트 시작일
          type: Sequelize.DATE,
          allowNull: true,
        },
        event_end: { // 이벤트 종료일
          type: Sequelize.DATE,
          allowNull: true,
        },
        event_link: { // 링크
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        event_img: { // 이벤트 사진
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
