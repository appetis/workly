const { token } = require('./auth');
const bcrypt = require('bcrypt');
jest.mock('../models');
const { User } = require('../models');

describe('login', () => {
    const email = 'test@test.com';
    const password = 'test1234';
    const req = {
        body: { email, password }
    };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    };

    test('should response 401 if user info is incorrect', async () => {
        User.findOne.mockReturnValue(Promise.resolve({ email, password }));

        await token(req, res);
        expect(res.status).toBeCalledWith(401);
    });

    test('should response 200 with JWT token', async () => {
        const jwt = {
            sign: jest.fn(() => "test-token")
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        User.findOne.mockReturnValue(Promise.resolve({ email, password: hashedPassword }));

        await token(req, res);

        expect(res.status).toBeCalledWith(200);
        const expected = {
            code: 200,
            message: 'Token generated',
            token: expect.any(String)
        };
        expect(res.json).toBeCalledWith(expected)
    });

    test('should response 500 if there is server error', async () => {
        const error = 'server error';
        console.error = jest.fn();
        User.findOne.mockReturnValue(Promise.reject(error));

        await token(req, res);
        expect(res.status).toBeCalledWith(500);
    })
});
