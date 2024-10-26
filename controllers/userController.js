const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        console.log('userController.createUser\nRequest Body: ', req.body);
        const user = await User.create(req.body);
        res.redirect('/users');
    } catch (error) {
        console.log('userController.createUser\nError: ', error);
        res.status(400).render('userForm', { error: error.errors.map(e => e.message) });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).render('userList', { users });
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send('Користувач не знайдений');
        }
        if (req.path.includes('/edit')) {
            return res.render('userEdit', { user });
        }

        res.status(200).render('userDetail', { user });
    } catch (error) {
        res.status(500).send('Виникла помилка при отриманні користувачів');
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(req.params.id);
        if (user) {
            console.log("Старі дані:", user.username, user.email);

            user.username = req.body.username;
            user.email = req.body.email;

            console.log("Нові дані:", user.username, user.email);

            await user.save();

            res.redirect(`/users/${userId}`);
        } else {
            res.status(404).send('Користувача не знайдено');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Виникла помилка');
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).render('error', { error: 'User not found' });

        await user.destroy();
        res.status(204).redirect('/users');
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
