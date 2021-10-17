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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  },
};
