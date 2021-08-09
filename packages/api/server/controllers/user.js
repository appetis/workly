const bcrypt = require('bcrypt');
const {User} = require('../models');

exports.create = async (req, res) => {
    try {
        let email = req.body.email;
        if (!validateEmail(email)) {
            return res.status(401).send('Invalid email address');
        }

        let password = req.body.password;
        if (password.length < 8) {
            return res.status(401).send('Password must be at least 8 characters');
        }

        const user = await User.findOne({
            where: {
                email
            }
        });
        if (user) {
            return res.status(403).send('Email is already in use.');

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await User.create({
            email,
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

validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
