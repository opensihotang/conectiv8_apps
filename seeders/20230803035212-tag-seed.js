
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    const tags = [
      {
        name: '#tag1'
      },
      {
        name: '#tag2'
      },
      {
        name: '#tag3'
      },
      {
        name: '#tag4'
      },
      {
        name: '#tag5'
      },
    ]
    const data = tags.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Tags', data, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', null, {})
  }
};
