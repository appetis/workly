const crypto = require("crypto");
const { Code } = require('../models');

const expiredDays = 1;
const fromEmail = 'no-reply@workly.page';

exports.sendVerificationCode = async (user) => {
    try {
        const code = await getUniqueCode();
        await saveCode(user['id'], code);
        send(user['email'], 'Workly Verification Code', '', code);
    } catch (error) {
        console.error(error);
    }
}

saveCode = async (userId, code) => {
    Code.create({
        code,
        status: 'CR',
        expiredAt: getExpiredTime(),
        UserId: userId
    });
}

send = (toEmail, subject, content, code) => {
    if (process.env.NODE_ENV === 'production') {
        // TODO: send an email via AWS SES
    } else {
        console.log('Email Verification Code:', code);
    }
}

getExpiredTime = () => {
    let now = new Date();
    let expiredTime = new Date();
    expiredTime.setDate(now.getDate() + expiredDays);

    return expiredTime;
}

getUniqueCode = async () => {
    let code;
    do {
        code = generateCode(6);
    } while (await isExisted(code))

    return code;
}

isExisted = async (code) => {
    const existedCode = await Code.findOne({
        where: { code }
    });

    return existedCode != null;
}

generateCode = (length) => {
    let code = crypto.randomBytes(length).toString('hex');
    return code.substr(0, length).toUpperCase();
}
