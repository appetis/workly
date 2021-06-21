const bcrypt = require('bcrypt');
const {User} = require('../models');

exports.create = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            return res.status(403).send('Email is already in use.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let newUser = await User.create({
            email: req.body.email,
            password: hashedPassword
        });
        delete newUser.dataValues.password;

        return res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: parseInt(req.params.id, 10)
            }, attributes: {
                exclude: ['password']
            }
        });
        if (!user) {
            return res.status(204).send();
        }

        return res.status(202).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};
