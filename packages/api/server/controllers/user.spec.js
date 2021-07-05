const { create, getUsers, getUser } = require('./user');
jest.mock('../models');
const { User } = require('../models');

describe('create a user', () => {
    const req = {
        body: {
            email: 'test@test.com',
            password: 'test'
        }
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn()
    };

    test('should response 201 if a user created', async () => {
        User.findOne.mockReturnValue(Promise.resolve(null));
        User.create.mockReturnValue(Promise.resolve({
            dataValues: {
                id: 1,
                email: 'test@test.com',
                password: 'test'
            }
        }));

        await create(req, res);
        expect(res.status).toBeCalledWith(201);
    });

    test('should response 403 if the email is in use', async () => {
        User.findOne.mockReturnValue(Promise.resolve({
            id: 1,
            email: 'test@test.com'
        }));

        await create(req, res);
        expect(res.status).toBeCalledWith(403);
    });

    test('should response 500 if there is server error', async () => {
        const error = 'server error';
        console.error = jest.fn();
        User.findOne.mockReturnValue(Promise.reject(error));

        await create(req, res);
        expect(res.status).toBeCalledWith(500);
    });
});

describe('get all users', () => {
    const req = {};
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn()
    };

    test('should response 200', async () => {
        User.findAll.mockReturnValue(Promise.resolve({}));

        await getUsers(req, res);
        expect(res.status).toBeCalledWith(200);
    });

    test('should response 500 if there is server error', async () => {
        const error = 'server error';
        console.error = jest.fn();
        User.findAll.mockReturnValue(Promise.reject(error));

        await getUsers(req, res);
        expect(res.status).toBeCalledWith(500);
    });
});

describe('get a user', () => {
    const req = {
        params: { id: 1 }
    };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn()
    };

    test('should response 204 if the user does not exist', async () => {
        User.findOne.mockReturnValue(Promise.resolve(null));

        await getUser(req, res);
        expect(res.status).toBeCalledWith(204);
    });

    test('should response 202 if the user exists', async () => {
       User.findOne.mockReturnValue(Promise.resolve({
           id: 1,
           email: 'test@test.com'
       }));

       await getUser(req, res);
       expect(res.status).toBeCalledWith(202);
    });

    test('should response 500 if there is server error', async () => {
        const error = 'server error';
        console.error = jest.fn();
        User.findOne.mockReturnValue(Promise.reject(error));

        await getUser(req, res);
        expect(res.status).toBeCalledWith(500);
    });
});
