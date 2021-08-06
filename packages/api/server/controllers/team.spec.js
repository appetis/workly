const { create, getByName, join } = require('./team');
jest.mock('../models');
const { Team } = require('../models');
jest.mock('../models');
const { User } = require('../models');

describe('get a team by name', () => {
    const req = {
        params: {
            name: 'test'
        }
    };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn()
    };

    test('should response 200', async () => {
        Team.findOne.mockReturnValue(Promise.resolve({
            name: 'test'
        }));

        await getByName(req, res);
        expect(res.status).toBeCalledWith(200);
    });

    test('should response 500 if there is server error', async () => {
        const error = 'server error';
        console.error = jest.fn();
        Team.findOne.mockReturnValue(Promise.reject(error));

        await getByName(req, res);
        expect(res.status).toBeCalledWith(500);
    });
});

describe('join a team', () => {
    const req = {
        body: {
            userId: 1,
            teamId: 1
        }
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn()
    };

    test('should response 400 if the user does not exist', async () => {
        User.findOne.mockReturnValue(Promise.resolve(null));

        await join(req, res);
        expect(res.status).toBeCalledWith(400);
    });

    test('should response 400 if the team does not exists', async () => {
       Team.findOne.mockReturnValue(Promise.resolve(null));

       await join(req, res);
       expect(res.status).toBeCalledWith(400);
    });
});
