const {verifyToken} = require('./middlewares');
const jwt = require('jsonwebtoken');

describe('verifyToken', () => {
    const req = {
        headers: {
            authorization: 'Bearer test-token'
        },
        decoded: {}
    };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    };
    const next = jest.fn();

    test('should response 401 if the token is invalid', () => {
        verifyToken(req, res, next)
        expect(res.status).toBeCalledWith(401);
    });

    test('next() should be called if the token is verified', () => {
        jwt.verify = jest.fn(() => {});
        verifyToken(req, res, next);
        expect(next).toBeCalledTimes(1);
    });
});
