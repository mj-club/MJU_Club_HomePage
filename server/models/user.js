const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        ph_number: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        school_year: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        student_id: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        auth_lv: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        major: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(45),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        accessible_club: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // User - ClubInfo (m:n)
    db.User.belongsToMany(db.ClubInfo, { through: db.ClubMember });
    // User - Post (1:n)
    db.User.hasMany(db.Post, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });
    // User - thumb - Post (m:n)
    // db.User.belongsToMany(db.Post, { through: db.Thumb });
    // User - Comment (1:n)
    db.User.hasMany(db.Comment, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });
    // User - RentalApply (1:n)
    db.User.hasMany(db.RentalApply, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
    // User - Schedule (1:n)
    db.User.hasMany(db.Schedule, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
};
