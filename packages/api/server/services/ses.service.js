const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const SES_CONFIG = {
    accessKeyId: process.env.SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
};

const AWS_SES = new AWS.SES(SES_CONFIG);
const fromEmail = 'no-reply@workly.page';

exports.sendEmail = (toEmail, subject, body) => {
    let params = {
        Source: fromEmail,
        Destination: {
            ToAddresses: [
                toEmail
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: body,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            }
        },
    };

    return AWS_SES.sendEmail(params).promise();
};

exports.sendTemplateEmail = (toEmail, code) => {
    let params = {
        Source: fromEmail,
        Template: 'WorklyVerificationTemplate',
        Destination: {
            ToAddresses: [
                toEmail
            ]
        },
        TemplateData: `{"code": "${code}"}`
    };

    return AWS_SES.sendTemplatedEmail(params).promise();
};
