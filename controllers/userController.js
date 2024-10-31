const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.errors.map(e => e.message) });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Користувач не знайдений' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Виникла помилка при отриманні користувача' });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Користувача не знайдено' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Виникла помилка' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Користувач не знайдений' });

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Серверна помилка' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
