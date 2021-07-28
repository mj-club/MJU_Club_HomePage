const Sequelize = require("sequelize");

module.exports = class UnionMember extends Sequelize.Model {
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
