const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(process.env.DB_NAME, 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});


module.exports = sequelize;
