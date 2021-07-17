const Sequelize = require("sequelize");

module.exports = class ClubUnionMember extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        member_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        member_position: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        member_division: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "ClubUnionMember",
        tableName: "club_union_member",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // ClubUnionMember - ClubUnionInfo (n:1)
    db.ClubUnionMember.belongsTo(db.ClubUnionInfo, {
      foreignKey: "club_union_id",
      targetKey: "id",
    });
  }
};
