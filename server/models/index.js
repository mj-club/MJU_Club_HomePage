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
const RentalInfo = require("./rental_info");
const RentalApply = require("./rental_apply");
const Join = require("./join");
const Sns = require("./sns");

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
db.RentalInfo = RentalInfo;
db.RentalApply = RentalApply;
db.Join = Join;
db.Sns = Sns;

User.init(sequelize);
ClubInfo.init(sequelize);
ClubMember.init(sequelize);
Comment.init(sequelize);
Post.init(sequelize);
Schedule.init(sequelize);
EventInfo.init(sequelize);
UnionInfo.init(sequelize);
File.init(sequelize);
RentalInfo.init(sequelize);
RentalApply.init(sequelize);
Join.init(sequelize);
Sns.init(sequelize);

User.associate(db);
ClubInfo.associate(db);
Post.associate(db);
Comment.associate(db);
Schedule.associate(db);
EventInfo.associate(db);
UnionInfo.associate(db);
File.associate(db);
RentalInfo.associate(db);
RentalApply.associate(db);
Join.associate(db);
Sns.associate(db);

module.exports = db;
