const crypto = require('crypto');
const ses = require('./ses.service');
const { Verification } = require('../models');

const expiredDays = 1;
const verificationCodeLength = 6;

const getExpiredTime = () => {
  const now = new Date();
  const expiredTime = new Date();
  expiredTime.setDate(now.getDate() + expiredDays);

  return expiredTime;
};

const saveCode = async (user, code) => {
  Verification.create({
    code,
    status: 'CR',
    expiredAt: getExpiredTime(),
    email: user.email,
    UserId: user.id,
  });
};

const send = (toEmail, code) => {
  console.log(`Email verification code: ${code}`);

  if (process.env.NODE_ENV === 'production') {
    ses
      .sendTemplateEmail(toEmail, code)
      .then(() => {
        console.log(`Sent the verification email to ${toEmail}`);
      })
      .catch(error => {
        console.error(error);
      });
  }
};

const generateCode = length => {
  const code = crypto.randomBytes(length).toString('hex');
  return code.substr(0, length).toUpperCase();
};

const isExisted = async code => {
  const existedCode = await Verification.findOne({
    where: { code },
  });

  return existedCode != null;
};

const getVerificationCode = async () => {
  let code;
  do {
    code = generateCode(verificationCodeLength);
    // eslint-disable-next-line no-await-in-loop
  } while (await isExisted(code));

  return code;
};

exports.sendVerificationCode = async user => {
  try {
    const code = await getVerificationCode();
    await saveCode(user, code);

    send(user.email, code);
  } catch (error) {
    console.error(error);
  }
};
