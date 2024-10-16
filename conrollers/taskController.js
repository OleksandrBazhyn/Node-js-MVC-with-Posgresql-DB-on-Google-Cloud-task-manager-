const { Task, User } = require('../models');

exports.createTask = async (req, res) => {
    const { userId, title } = req.body;
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.errors.map(e => e.message)});
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error'});
    }
};

exports.getTasksById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found'});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error'});
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found'});

        await task.update(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.errors.map(e => e.message)});
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found'});

        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Server error'});
    }
};