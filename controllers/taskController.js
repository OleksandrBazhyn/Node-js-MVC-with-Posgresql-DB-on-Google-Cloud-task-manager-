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
            return res.status(404).json({ error: '������ �� ��������' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: '������� ������� ��� �������� ������' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: '������ �� ��������' });
        }
    } catch (error) {
        res.status(500).json({ error: '������� �������' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: '������ �� ��������' });

        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: '�������� �������' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
