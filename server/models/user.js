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
          unique: true,
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
        name: {
          type: Sequelize.STRING(15),
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
    // User - ClubInfo (m:n)
    db.User.belongsToMany(db.ClubInfo, { through: db.ClubMember });

    // User - ClubPost (1:n)
    db.User.hasMany(db.ClubPost, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });

    // User - thumb - ClubPost (m:n)
    db.User.belongsToMany(db.ClubPost, { through: db.Thumb });

    // User - ClubPostComment (1:n)
    db.User.hasMany(db.ClubPostComment, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });
<<<<<<< HEAD

    // User - PetitionPost (1:n)
    db.User.hasMany(db.PetitionPost, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
=======
//     db.User.hasMany(db.Club_post);
//     db.User.hasMany(db.Club_member);
//     db.User.hasMany(db.Club_post_comment);
//     db.User.hasMany(db.Thumb);
//     db.User.hasMany(db.Club_union_post);
//     db.User.hasMany(db.Club_union_post_comment);
//     db.User.hasMany(db.Event_info);
//     db.User.hasMany(db.Rental_apply);
//     db.User.hasMany(db.Petition_Post);
>>>>>>> 110f9366e249d843481114fcb8cf24c767da31c0
  }
};
