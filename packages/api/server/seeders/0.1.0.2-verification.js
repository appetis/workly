const dateUtil = require('../utils/date.util');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Verifications', [
      {
        id: 1,
        UserId: 1,
        code: 'AAAAAA',
        email: 'wonho@workly.page',
        status: 'VE',
        expiredAt: dateUtil.addDaysFomNow(-3),
        createdAt: dateUtil.addDaysFomNow(-4),
        updatedAt: dateUtil.addDaysFomNow(-4),
      },
      {
        id: 2,
        UserId: 2,
        code: 'BBBBBB',
        email: 'hyewon@workly.page',
        status: 'VE',
        expiredAt: dateUtil.addDaysFomNow(-2),
        createdAt: dateUtil.addDaysFomNow(-3),
        updatedAt: dateUtil.addDaysFomNow(-3),
      },
      {
        id: 3,
        UserId: 3,
        code: 'CCCCCC',
        email: 'jay@workly.page',
        status: 'VE',
        expiredAt: dateUtil.addDaysFomNow(-1),
        createdAt: dateUtil.addDaysFomNow(-2),
        updatedAt: dateUtil.addDaysFomNow(-2),
      },
      {
        id: 4,
        UserId: 4,
        code: 'DDDDDD',
        email: 'emily@workly.page',
        status: 'VE',
        expiredAt: dateUtil.addDaysFomNow(0),
        createdAt: dateUtil.addDaysFomNow(-1),
        updatedAt: dateUtil.addDaysFomNow(-1),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Verifications', null, {});
  },
};
