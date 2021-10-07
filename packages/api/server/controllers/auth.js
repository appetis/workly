const bcrypt = require('bcrypt');
const { User, Team } = require('../models');
const authService = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
      include: {
        model: Team,
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    });
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: 'Cannot find the user',
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        code: 401,
        message: 'Authentication error',
      });
    }
    delete user.dataValues.password;

    if (user.status === 'VE') {
      const token = authService.generateToken(user.id);
      return res.status(200).json({
        code: 200,
        message: 'Logged in successfully',
        user,
        token,
      });
    }
    return res.status(200).json({
      code: 200,
      message: 'User email is not verified',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error',
    });
  }
};
