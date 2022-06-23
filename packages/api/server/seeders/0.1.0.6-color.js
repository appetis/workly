module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Colors', [
      {
        color: '#042F31',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#4DA5AA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#E6F2F3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#FAFAFA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#151515',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#1B5289',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#3B2B98',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#883955',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#BB6811',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#ECE9EA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#E6F2F3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#D7EBFF',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#E1DFEF',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#F0D0E0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color: '#FFDFBE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
