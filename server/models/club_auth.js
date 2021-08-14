const Sequelize = require("sequelize");

module.exports = class ClubAuth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: { // 이메일
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },

        password: { // 패스워드
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ClubAuth",
        tableName: "club_auth",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
