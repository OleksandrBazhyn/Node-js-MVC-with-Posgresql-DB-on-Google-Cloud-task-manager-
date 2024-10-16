require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT
    }
);

const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Створення бази даних, якщо її немає
        await sequelize.sync();
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, initDb };