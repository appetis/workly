const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const { Token } = require('../models');

dotenv.config();

const getExpiredAt = () => {
  const expiredAt = new Date();
  const expirationSeconds = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION, 10);
  expiredAt.setSeconds(expiredAt.getSeconds() + expirationSeconds);
  return expiredAt;
};

const findTokenByUserId = async userId => {
  return Token.findOne({
    where: {
      UserId: userId,
    },
  });
};

const createOrUpdateRefreshToken = async userId => {
  const tokenData = {
    UserId: userId,
    type: 'refresh',
    token: uuidv4(),
    expiredAt: getExpiredAt(),
  };

  let token = await findTokenByUserId(userId);
  if (token) {
    token = await token.update(tokenData);
  } else {
    token = await Token.create(tokenData);
  }

  return token;
};

exports.verifyExpiration = expiredAt => {
  return new Date().getTime() < expiredAt.getTime();
};

exports.generateAccessToken = userId => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      issuer: 'workly',
    },
  );
};

exports.generateRefreshToken = async userId => {
  const refreshToken = await createOrUpdateRefreshToken(userId);
  return refreshToken.token;
};
