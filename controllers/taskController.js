const { Task } = require('../models');

const createTask = async (req, res) => {
    try {
        console.log('taskController.createTask\nRequest Body: ', req.body);
        const task = await Task.create(req.body);
        res.redirect('/tasksList');
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
        if (!task) {
            return res.status(404).send('Задача не знайдена');
        }
        
        if (req.path.includes('/edit')) {
            return res.render('taskEdit', { task });
        }
        
        res.render('taskDetail', { task });
    } catch (error) {
        res.status(500).send('Виникла помилка при отриманні задачі');
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (task) {
            console.log("Старі дані:", task.title, task.description, task.completed);
            
            task.title = req.body.title;
            task.description = req.body.description;
            task.completed = req.body.completed;
            
            console.log("Нові дані:", task.title, task.description, task.completed);

            await task.save();

            res.redirect(`/tasks/${taskId}`);
        } else {
            res.status(404).send('Задачу не знайдено');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Виникла помилка');
    }
};


const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).render('error', { error: 'Task not found' });

        await task.destroy();
        res.redirect('/tasksList');
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
