require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        port: process.env.DB_PORT,
    }
);

const initDb = async () => {
    try {
        await connectToDatabase();
        await sequelize.sync();
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unhandled error:', error);
    }
};

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

const createDatabase = async () => {
    try {
        console.error('Database creation is not implemented in this code.');
    } catch (createError) {
        console.error('Unable to create the database:', createError);
        throw createError;
    }
};

module.exports = { sequelize, initDb };
