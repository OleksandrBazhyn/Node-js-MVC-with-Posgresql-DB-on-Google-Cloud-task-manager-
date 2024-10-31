require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const tempSequelize = new Sequelize(
    'master',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        dialect: 'mssql',
        port: process.env.DB_PORT || 1433,
    }
);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        dialect: 'mssql',
        port: process.env.DB_PORT || 1433,
    }
);

const initDb = async () => {
    try {
        await connectToDatabase();
        await sequelize.sync();
        console.log('Database synced successfully.');
    } catch (error) {
        if (error.original && error.original.code === '3D000') { // Цей код помилки не застосовується для SQL Server
            console.error('Unhandled error:', error);
        } else {
            console.error('Unhandled error:', error);
        }
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

module.exports = { sequelize, initDb };
