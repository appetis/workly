const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Verification, Profile, Code } = require('../models');
const emailService = require('../services/email.service');
const authService = require('../services/auth.service');

const findUsers = async () => {
  return User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
};

const findNameByStatusCode = async statusCode => {
  const code = await Code.findOne({
    where: {
      code: statusCode,
    },
    attributes: ['name'],
  });

  return code.name;
};

const addProfileStatusName = async profile => {
  const statusName = await findNameByStatusCode(profile.status);
  profile.setDataValue('statusName', statusName);
};

const findUserWithProfileById = async id => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Profile,
        attributes: ['name', 'avatar', 'department', 'position', 'phone', 'phone_ext', 'status'],
      },
    ],
  });

  if (user.Profile) {
    await addProfileStatusName(user.Profile);
  }

  return user;
};

const findUserByEmail = async email => {
  return User.findOne({
    where: {
      email,
    },
  });
};

const findVerificationToVerify = async userId => {
  return Verification.findOne({
    where: {
      UserId: userId,
      status: 'CR',
      expiredAt: {
        [Op.gt]: new Date(),
      },
    },
  });
};

const verifyStatus = async (user, userVerification) => {
  await user.update({ status: 'VE' });
  await userVerification.update({ status: 'VE' });
};

const findUserProfile = async userId => {
  return Profile.findOne({
    where: {
      UserId: userId,
    },
  });
};

const createOrUpdateUserProfile = async (userId, data) => {
  const profileData = {
    UserId: userId,
    name: data.name,
    department: data.department,
    position: data.position,
    phone: data.phone,
    phone_ext: data.phone_ext,
    status: data.status,
  };

  let profile = await findUserProfile(userId);
  if (profile) {
    profile = await profile.update(profileData);
  } else {
    profile = await Profile.create(profileData);
  }

  await addProfileStatusName(profile);

  return profile;
};

const validateEmail = email => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });
  delete newUser.dataValues.password;

  return newUser;
};

exports.create = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid email address',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        code: 400,
        message: 'Password must be at least 8 characters',
      });
    }

    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({
        code: 400,
        message: 'Email is already in use.',
      });
    }

    const newUser = await createUser(email, password);

    await emailService.sendVerificationCode(newUser);

    return res.status(201).json({
      code: 201,
      message: 'Created the user',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error',
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await findUsers();

    return res.status(200).json({
      code: 200,
      message: 'Found all users',
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error',
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await findUserWithProfileById(req.params.id);
    if (!user) {
      return res.status(204).json({
        code: 204,
        message: 'Cannot find the user',
      });
    }

    return res.status(200).json({
      code: 200,
      message: 'Found the user',
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

exports.verify = async (req, res) => {
  try {
    const userId = req.params.id;
    const { code } = req.body;

    const user = await findUserWithProfileById(userId);
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: 'Cannot find the user',
      });
    }

    const userVerification = await findVerificationToVerify(userId);
    if (!userVerification || userVerification.code !== code) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid code',
      });
    }

    await verifyStatus(user, userVerification);

    return res.status(200).json({
      code: 200,
      message: 'Verified the user email',
      user,
      token: authService.generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error',
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await findUserWithProfileById(userId);
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: 'Cannot find the user',
      });
    }

    const profile = await createOrUpdateUserProfile(userId, req.body);

    return res.status(200).json({
      code: 200,
      message: 'Updated the profile',
      profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error',
    });
  }
};
