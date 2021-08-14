const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: { // 이메일
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        name: { // 이름
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        password: { // 패스워드
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        ph_number: { // 휴대폰 번호
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        department: { // 소속 대학
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        school_year: { // 학년
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        student_id: { // 학번 
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        auth_lv: { // 권한 
          type: Sequelize.INTEGER,
          allowNull: true, // 임시
        },
        major: { // 전공
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        provider: { // 카카오 로그인인지 로컬 로그인인지
          type: Sequelize.STRING(45),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: { // sns 아이디
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        accessible_club: { // 소속 동아리
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
