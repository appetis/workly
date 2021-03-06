const dateUtil = require('../utils/date.util');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Profiles', [
      {
        id: 1,
        UserId: 1,
        name: 'Wonho Lee',
        avatar: '',
        department: 'IT',
        position: 'Developer',
        phone: '111-111-1111',
        phone_ext: '111',
        status: 'OF',
        createdAt: dateUtil.addDaysFomNow(-4),
        updatedAt: dateUtil.addDaysFomNow(-4),
      },
      {
        id: 2,
        UserId: 2,
        name: 'Hyewon Kim',
        avatar: '',
        department: 'IT',
        position: 'Developer',
        phone: '222-222-2222',
        phone_ext: '222',
        status: 'OF',
        createdAt: dateUtil.addDaysFomNow(-3),
        updatedAt: dateUtil.addDaysFomNow(-3),
      },
    ]);

    await queryInterface.sequelize.query('ALTER SEQUENCE "Profiles_id_seq" RESTART WITH 100');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
