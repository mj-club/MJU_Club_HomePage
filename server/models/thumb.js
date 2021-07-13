const Sequelize = require("sequelize");

<<<<<<< HEAD
module.exports = class Thumb extends Sequelize.Model {
=======
module.exports = class Comment extends Sequelize.Model {
>>>>>>> 110f9366e249d843481114fcb8cf24c767da31c0
  static init(sequelize) {
    return super.init(
      {
        check_at: {
          type: Sequelize.STRING(45),
<<<<<<< HEAD
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Thumb",
        tableName: "thumb",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
};
=======
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        modelName: "Thumb",
        tableName: "thumbs",
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
>>>>>>> 110f9366e249d843481114fcb8cf24c767da31c0
