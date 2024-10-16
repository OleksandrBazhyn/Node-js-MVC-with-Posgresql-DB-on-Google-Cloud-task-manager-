require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
    }
);

const initDb = async () => {
    try {
        await connectToDatabase();

        await sequelize.sync();
        console.log('Database synced successfully.');
    } catch (error) {
        if (error.original.code === '3D000') {
            try {
                await createDatabase();
                await connectToDatabase();
                await sequelize.sync();
                console.log('Database synced successfully.');
            } catch (createError) {
                console.error('Error during database creation or syncing:', createError);
            }
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

const createDatabase = async () => {
    try {
        const tempSequelize = new Sequelize(
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'postgres',
                port: process.env.DB_PORT,
            }
        );

        await tempSequelize.query(`CREATE DATABASE "${process.env.DB_NAME}";`, { type: QueryTypes.RAW });
        console.log('Database created successfully.');

        await tempSequelize.close(); 
    } catch (createError) {
        console.error('Unable to create the database:', createError);
        throw createError;
    }
};



module.exports = { sequelize, initDb };
