const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(45),
          allowNull: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        ph_number: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        sex: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        school_year: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        school_id: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        auth_lv: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        major: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING(45),
          allowNull: false,
          defaultValue: "local",
        },
        profile_img: {
          type: Sequelize.STRING(45),
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
    db.User.hasMany(db.Club_post);
    db.User.hasMany(db.Club_member);
    db.User.hasMany(db.Club_post_comment);
    db.User.hasMany(db.Thumb);
    db.User.hasMany(db.Club_union_post);
    db.User.hasMany(db.Club_union_post_comment);
    db.User.hasMany(db.Event_info);
    db.User.hasMany(db.Rental_apply);
    db.User.hasMany(db.Petition_Post);
  }
};
