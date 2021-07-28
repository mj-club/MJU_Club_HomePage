"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const User = require("./user");
const ClubPost = require("./club_post");
const ClubPostComment = require("./club_post_comment");
const ClubInfo = require("./club_info");
const ClubMember = require("./club_member");
const Schedule = require("./schedule");
const EventInfo = require("./event_info");
const ClubUnionInfo = require("./club_union_info");

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
db.ClubPostComment = ClubPostComment;
db.ClubPost = ClubPost;
db.Schedule = Schedule;
db.EventInfo = EventInfo;
db.ClubUnionInfo = ClubUnionInfo;

User.init(sequelize);
ClubInfo.init(sequelize);
ClubMember.init(sequelize);
ClubPostComment.init(sequelize);
ClubPost.init(sequelize);
Schedule.init(sequelize);
EventInfo.init(sequelize);
ClubUnionInfo.init(sequelize);

User.associate(db);
ClubInfo.associate(db);
ClubPost.associate(db);
ClubPostComment.associate(db);
Schedule.associate(db);
EventInfo.associate(db);
ClubUnionInfo.associate(db);

module.exports = db;
