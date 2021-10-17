module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserTeams', [
      {
        UserId: 1,
        TeamId: 1,
        status: 'VE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        TeamId: 1,
        status: 'IN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserTeams', null, {});
  },
};
