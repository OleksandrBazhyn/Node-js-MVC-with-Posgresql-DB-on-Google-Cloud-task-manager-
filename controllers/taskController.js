const { Task } = require('../models');

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.redirect('/tasks');
    } catch (error) {
        res.status(400).render(error, { error: error.errors.map(e => e.message) });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.render('tasks', { tasks });
    } catch (error) {
        res.status(500).render(error, { error: 'Server error' });
    }
};

exports.getTasksById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).render(error, { error: 'Task not found' });
        res.render('taskDetail', { task });
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).render(error, { error: 'Task not found' });

        await task.update(req.body);
        res.redirect('/tasks');
    } catch (error) {
        res.status(400).render('error', { error: error.errors.map(e => e.message) });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).render('error', { error: 'Task not found' });

        await task.destroy();
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};