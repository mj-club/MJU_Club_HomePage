const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        event_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        event_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        event_target: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        event_term: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Event_info",
        tableName: "event_infos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // db.Comment.belongsTo(db.User, {foreignKey: "commenter", targetkey: "id"});
  }
};