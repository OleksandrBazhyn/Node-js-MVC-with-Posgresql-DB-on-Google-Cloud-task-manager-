const { Task } = require('../models');

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.errors.map(e => e.message) });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Задача не знайдена' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Виникла помилка при отриманні задачі' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Задачу не знайдено' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Виникла помилка' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Задача не знайдена' });

        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Серверна помилка' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
