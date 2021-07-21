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
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        ph_number: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        sex: {
          type: Sequelize.INTEGER,
          allowNull: true,
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
        profile_img: {
          type: Sequelize.STRING(200),
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
    // // User - ClubInfo (m:n)
    // db.User.c(db.ClubInfo, { through: db.ClubMember });
    // // User - ClubPost (1:n)
    // db.User.hasMany(db.ClubPost, {
    //   foreignKey: "writer_id",
    //   sourceKey: "id",
    // });
    // // User - thumb - ClubPost (m:n)
    // db.User.belongsToMany(db.ClubPost, { through: db.Thumb });
    // // User - ClubPostComment (1:n)
    // db.User.hasMany(db.ClubPostComment, {
    //   foreignKey: "writer_id",
    //   sourceKey: "id",
    // });
    // // User - PetitionPost (1:n)
    // db.User.hasMany(db.PetitionPost, {
    //   foreignKey: "user_id",
    //   sourceKey: "id",
    // });
    //     db.User.hasMany(db.Club_post);
    //     db.User.hasMany(db.Club_member);
    //     db.User.hasMany(db.Club_post_comment);
    //     db.User.hasMany(db.Thumb);
    //     db.User.hasMany(db.Club_union_post);
    //     db.User.hasMany(db.Club_union_post_comment);
    //     db.User.hasMany(db.Event_info);
    //     db.User.hasMany(db.Rental_apply);
    //     db.User.hasMany(db.Petition_Post);
  }
};
