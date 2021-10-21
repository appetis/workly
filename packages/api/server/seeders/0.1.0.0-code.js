module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Codes', [
      {
        id: 1,
        name: 'Admin',
        type: 'ROLE',
        code: 'AD',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'User',
        type: 'ROLE',
        code: 'US',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: 'Created',
        type: 'STATUS',
        code: 'CR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: 'Verified',
        type: 'STATUS',
        code: 'VE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: 'Invited',
        type: 'STATUS',
        code: 'IN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: 'Accepted',
        type: 'STATUS',
        code: 'AC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: 'In office',
        type: 'PROFILE',
        code: 'OF',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: 'Work from home',
        type: 'PROFILE',
        code: 'WH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        name: 'Project',
        type: 'EVENT',
        code: 'PR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        name: 'Business trip',
        type: 'EVENT',
        code: 'BT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        name: 'Meeting',
        type: 'EVENT',
        code: 'ME',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 34,
        name: 'Vacation',
        type: 'EVENT',
        code: 'VA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 41,
        name: 'Light',
        type: 'THEME',
        code: 'LI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 42,
        name: 'Dark',
        type: 'THEME',
        code: 'DR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Codes', null, {});
  },
};