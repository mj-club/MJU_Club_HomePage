require("dotenv").config("../.env");

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PW_DEV,
    database: "mju_club",
    host: process.env.DB_HOST_DEV,
    dialect: "mysql",
<<<<<<< HEAD
    timezone: "+09:00",
=======
    timezone: '+09:00',
>>>>>>> 34285f35261d137512ad1a8794ffbfa719982062
  },
  test: {
    username: "mju_club_dev",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
<<<<<<< HEAD
    timezone: "+09:00",
=======
    timezone: '+09:00',
>>>>>>> 34285f35261d137512ad1a8794ffbfa719982062
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: "mju_club",
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
<<<<<<< HEAD
    timezone: "+09:00",
=======
    timezone: '+09:00',
>>>>>>> 34285f35261d137512ad1a8794ffbfa719982062
  },
};
