const Sequelize = require("sequelize");

module.exports = class UnionMember extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        member_name: { // 멤버 이름
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        member_position: { // 멤버 직급
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        member_division: { // 홍보국, 기획국 등
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "UnionMember",
        tableName: "union_members",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // UnionMember - UnionInfo (n:1)
    db.ClubUnionMember.belongsTo(db.UnionInfo, {
      foreignKey: "union_id",
      targetKey: "id",
    });
  }
};
