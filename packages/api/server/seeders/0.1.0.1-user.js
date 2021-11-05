const bcryptUtil = require('../utils/bcrypt.util');
const dateUtil = require('../utils/date.util');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'wonho@workly.page',
        password: await bcryptUtil.getHashedPassword('test1234'),
        status: 'VE',
        createdAt: dateUtil.addDaysFomNow(-4),
        updatedAt: dateUtil.addDaysFomNow(-4),
      },
      {
        id: 2,
        email: 'hyewon@workly.page',
        password: await bcryptUtil.getHashedPassword('test1234'),
        status: 'VE',
        createdAt: dateUtil.addDaysFomNow(-3),
        updatedAt: dateUtil.addDaysFomNow(-3),
      },
      {
        id: 3,
        email: 'jay@workly.page',
        password: await bcryptUtil.getHashedPassword('test1234'),
        status: 'VE',
        createdAt: dateUtil.addDaysFomNow(-2),
        updatedAt: dateUtil.addDaysFomNow(-2),
      },
      {
        id: 4,
        email: 'emily@workly.page',
        password: await bcryptUtil.getHashedPassword('test1234'),
        status: 'VE',
        createdAt: dateUtil.addDaysFomNow(-1),
        updatedAt: dateUtil.addDaysFomNow(-1),
      },
      {
        id: 5,
        email: 'test@workly.page',
        password: await bcryptUtil.getHashedPassword('test1234'),
        status: 'CR',
        createdAt: dateUtil.addDaysFomNow(0),
        updatedAt: dateUtil.addDaysFomNow(0),
      },
    ]);

    await queryInterface.sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART WITH 100');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
