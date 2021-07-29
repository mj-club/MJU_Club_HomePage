"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const ClubInfo = require("./club_info");
const ClubMember = require("./club_member");
const Schedule = require("./schedule");
const EventInfo = require("./event_info");
const UnionInfo = require("./union_info");
const File = require("./file");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.User = User;
db.ClubInfo = ClubInfo;
db.ClubMember = ClubMember;
db.Comment = Comment;
db.Post = Post;
db.Schedule = Schedule;
db.EventInfo = EventInfo;
db.UnionInfo = UnionInfo;
db.File = File;

User.init(sequelize);
ClubInfo.init(sequelize);
ClubMember.init(sequelize);
Comment.init(sequelize);
Post.init(sequelize);
Schedule.init(sequelize);
EventInfo.init(sequelize);
UnionInfo.init(sequelize);
File.init(sequelize);

User.associate(db);
ClubInfo.associate(db);
Post.associate(db);
Comment.associate(db);
Schedule.associate(db);
EventInfo.associate(db);
UnionInfo.associate(db);
File.associate(db);

module.exports = db;
