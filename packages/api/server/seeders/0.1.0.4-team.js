module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Teams', [
      {
        id: 1,
        name: 'Appetis',
        status: 'VE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.sequelize.query('ALTER SEQUENCE "Teams_id_seq" RESTART WITH 100');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  },
};
