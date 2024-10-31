const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Task = require('./task');

const Attachment = sequelize.define('Attachment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    TaskId: {
        type: DataTypes.INTEGER,
        references: {
            model: Task,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Attachment',
    timestamps: false,
});

Task.hasMany(Attachment, { onDelete: 'CASCADE' });
Attachment.belongsTo(Task);

module.exports = Attachment;