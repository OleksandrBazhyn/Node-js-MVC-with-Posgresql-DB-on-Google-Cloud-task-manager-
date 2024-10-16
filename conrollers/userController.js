const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/users');
    } catch (error) {
        res.status(400).render('userForm', { error: error.errors.map(e => e.message) });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).render('userList', { users });
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).render('error', { error: 'User not found' });
        res.status(200).render('userDetail', { user });
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).render('error', { error: 'User not found' });

        await user.update(req.body);
        res.status(200).redirect('/users');
    } catch (error) {
        res.status(400).render('userForm', { user: req.body, error: error.errors.map(e => e.message) });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).render('error', { error: 'User not found' });

        await user.destroy();
        res.status(204).redirect('/users');
    } catch (error) {
        res.status(500).render('error', { error: 'Server error' });
    }
};
