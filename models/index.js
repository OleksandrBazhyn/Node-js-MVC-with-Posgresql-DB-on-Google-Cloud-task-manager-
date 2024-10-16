const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');

const initDB = async () => {
    try {
        await sequelize.sync();
        console.log('Database initialized');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
};

module.exports = { initDb, User, Task};