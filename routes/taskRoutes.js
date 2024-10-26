const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/create', (req, res) => {
    res.render('taskForm');
});
router.post('/create', taskController.createTask);

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;