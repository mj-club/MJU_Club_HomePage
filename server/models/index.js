"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const User = require("./user");
const Club_post = require("./club_post");
const Club_info = require("./club_info");
const Club_member = require("./club_member");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.User = User;
// db.Comment = Comment;
// db.Club_post = Club_post;
// db.Club_info = Club_member;
// db.Club_member = Club_member;

User.init(sequelize);
// Comment.init(sequelize);
// Club_post.init(sequelize);
// Club_info.init(sequelize);
// Club_member.init(sequelize);
User.associate(db);

module.exports = db;
