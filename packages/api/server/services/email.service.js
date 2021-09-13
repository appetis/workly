const crypto = require("crypto");
const ses = require('../services/ses.service');
const { Code } = require('../models');

const expiredDays = 1;
const verificationCodeLength = 6;

exports.sendVerificationCode = async (user) => {
    try {
        const code = await getVerificationCode();
        await saveCode(user['id'], code);

        send(user['email'], code);
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

send = (toEmail, code) => {
    console.log("Email verification code: " + code);

    if (process.env.NODE_ENV === 'production') {
        ses.sendTemplateEmail(toEmail, code)
            .then(() => {
                console.log("Sent the verification email to " + toEmail);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

getExpiredTime = () => {
    let now = new Date();
    let expiredTime = new Date();
    expiredTime.setDate(now.getDate() + expiredDays);

    return expiredTime;
}

getVerificationCode = async () => {
    let code;
    do {
        code = generateCode(verificationCodeLength);
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
