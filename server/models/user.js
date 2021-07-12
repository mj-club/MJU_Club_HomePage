const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        ph_number: {
          type: Sequelize.STRING(11),
          allowNull: false,
        },
        sex: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        major: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        school_year: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        student_id: {
          type: Sequelize.STRING(10),
        },
        permission: {
          type: Sequelize.INTEGER,
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        profile_img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        introduction: {
          type: Sequelize.STRING(140),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // User - ClubInfo (m:n)
    db.User.belongsToMany(db.ClubInfo, { through: db.ClubMember });

    // User - ClubPostComment (1:n)
    db.User.hasMany(db.ClubPostComment, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });
  }
};
