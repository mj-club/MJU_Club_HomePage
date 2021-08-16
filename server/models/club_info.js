const Sequelize = require("sequelize");

module.exports = class ClubInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { // 동아리 이름
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        representation: { // 회장이름
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        contact_number: { // 연락처 
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        introduction: { // 소개글 
          type: Sequelize.TEXT,
          allowNull: true,
        },
        plan: { // 활동 계획 (MT는 몇 월 등등)
          type: Sequelize.TEXT,
          allowNull: true,
        },
        recruit: { //
          type: Sequelize.TEXT,
          allowNull: true,
        },
        meeting: { // 정기모임 일정
          type: Sequelize.TEXT,
          allowNull: true,
        },
        recruitment: { //
          type: Sequelize.TEXT,
          allowNull: true,
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

    // ClubInfo - Post (1:n)
    db.ClubInfo.hasMany(db.Post, {
      foreignKey: "club_id",
      sourceKey: "id",
    });
    // ClubInfo - Sns (1:n)
    db.ClubInfo.hasMany(db.Sns, {
      foreignKey: "club_id",
      sourceKey: "id",
    });
    // ClubInfo - Join (1:n)
    db.ClubInfo.hasMany(db.Join, {
      foreignKey: "club_id",
      sourceKey: "id",
    });
    // ClubInfo - Schedule (1:n)
    db.ClubInfo.hasMany(db.Schedule, {
      foreignKey: "club_id",
      sourceKey: "id",
    });
  }
};
