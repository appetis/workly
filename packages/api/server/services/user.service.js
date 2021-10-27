const { Code, User, Profile } = require('../models');

const getStatusNameByCode = async statusCode => {
  const code = await Code.findOne({
    where: {
      code: statusCode,
    },
    attributes: ['name'],
  });

  return code.name;
};

const setProfileStatusName = async profile => {
  const statusName = await getStatusNameByCode(profile.status);
  profile.setDataValue('statusName', statusName);
};

exports.addProfileStatusName = async profile => {
  await setProfileStatusName(profile);
};

exports.getUserProfile = async userId => {
  return Profile.findOne({
    where: {
      UserId: userId,
    },
  });
};

exports.getUsers = async () => {
  return User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
};

exports.getUserByEmail = async email => {
  return User.findOne({
    where: {
      email,
    },
  });
};

exports.getUserWithProfileById = async id => {
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

  if (user && user.Profile) {
    await setProfileStatusName(user.Profile);
  }

  return user;
};

exports.getUserStatusNameById = async id => {
  const user = await User.findByPk(id, {
    attributes: [],
    include: [
      {
        model: Profile,
        attributes: ['status'],
      },
    ],
  });

  let statusName;
  if (user && user.Profile) {
    statusName = await getStatusNameByCode(user.Profile.status);
  }

  return statusName;
};
