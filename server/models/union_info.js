const Sequelize = require("sequelize");

module.exports = class UnionInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        slogan: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        representative: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        deputy_representative: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        organization_chart: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        logo: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        th: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamp: true,
        underscored: true,
        modelName: "UnionInfo",
        tableName: "union_info",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // UnionInfo - UnionMember (1:n)
    // db.UnionInfo.hasMany(db.UnionMember, {
    //   foreignKey: "union_id",
    //   sourceKey: "id",
    // });

    // UnionInfo - Post (1:n)
    db.UnionInfo.hasMany(db.Post, {
      foreignKey: "union_id",
      sourceKey: "id",
    });

    // UnionInfo - Schedule (1:n)
    db.UnionInfo.hasMany(db.Schedule, {
      foreignKey: "union_id",
      sourceKey: "id",
    });
  }
};
