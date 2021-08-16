const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models');

exports.generateToken = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return res.status(401).json({
                code: 401,
                message: 'Cannot found the user'
            });
        }

        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
            return res.status(401).json({
                code: 401,
                message: 'Authentication error'
            });
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '30m',
            issuer: 'workly'
        });

        return res.status(200).json({
            code: 200,
            message: 'Token generated',
            token,
            status: user.status
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: 'Server error'
        });
    }
};
