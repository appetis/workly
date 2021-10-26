const bcrypt = require('bcrypt');
const { User, Team, Token } = require('../models');
const authService = require('../services/auth.service');

const findToken = async token => {
  return Token.findOne({
    where: {
      token,
    },
  });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  const token = await findToken(refreshToken);
  if (!token) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid token',
    });
  }

  const verified = authService.verifyExpiration(token.expiredAt);
  if (!verified) {
    await token.destroy();
    return res.status(461).json({
      code: 461,
      message: 'Token expired',
    });
  }

  const accessToken = authService.generateAccessToken(token.UserId);
  return res.status(200).json({
    code: 200,
    message: 'Access token generated',
    accessToken,
    refreshToken: token.token,
  });
};

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
      const accessToken = authService.generateAccessToken(user.id);
      const refreshToken = await authService.generateRefreshToken(user.id);

      return res.status(200).json({
        code: 200,
        message: 'Authenticated',
        user,
        accessToken,
        refreshToken,
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
