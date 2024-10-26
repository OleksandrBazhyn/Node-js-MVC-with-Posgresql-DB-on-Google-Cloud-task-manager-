const { Task } = require('../models');

const createTask = async (req, res) => {
    try {
        console.log('taskController.createTask\nRequest Body: ', req.body);
        const task = await Task.create(req.body);
        res.redirect('/tasks');
    } catch (error) {
        console.log('taskController.createTask\nError: ', error);
        res.status(400).render('taskForm', { error: error.errors.map(e => e.message) });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.render('tasks', { tasks });
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).render('error', { error: 'Task not found' });
        res.render('taskDetail', { task });
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).render('error', { error: 'Task not found' });

        await task.update(req.body);
        res.redirect('/tasks');
    } catch (error) {
        res.status(400).render('error', { error: error.errors.map(e => e.message) });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).render('error', { error: 'Task not found' });

        await task.destroy();
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
