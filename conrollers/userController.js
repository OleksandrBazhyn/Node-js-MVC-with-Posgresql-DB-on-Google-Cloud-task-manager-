const { User } = require('../models');

exports.createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await User.create({ username, email });
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
    }
};