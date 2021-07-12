const Sequelize = require("sequelize");

module.exports = class ClubInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        introdution: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        representation: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        contact_number: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        sns: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        infomation: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "ClubInfo",
        tableName: "club_info",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // ClubInfo - User (n:m)
    db.ClubInfo.belongsToMany(db.User, { through: db.ClubMember });

    // ClubInfo - ClubPost (1:n)
    db.ClubInfo.hasMany(db.ClubPost, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });
  }
};
