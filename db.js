const Sequelize = require('sequelize');
const config = require("./config");

const DB_URL = config.get_connection_string_postgres;
const dialect = config.database_dialet;

const sequelize = new Sequelize(DB_URL, {
    logging: false,
    dialect,
    pool: {
        max: 1,
        min: 0,
        idle: 10000,
        acquire: 1000000,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize; 