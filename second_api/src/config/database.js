module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: "Root123@",
    database: process.env.DB_NAME || "afrodev_salao",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
};
