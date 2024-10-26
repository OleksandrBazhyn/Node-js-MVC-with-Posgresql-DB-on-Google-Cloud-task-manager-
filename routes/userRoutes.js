const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/create', (req, res) => {
    res.render('userForm');
});
router.post('/create', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.get('/:id/edit', userController.getUserById, (req, res) => {
    res.render('userEdit', { user: req.user });
});
router.put('/:id/edit', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;