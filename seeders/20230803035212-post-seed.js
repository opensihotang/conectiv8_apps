'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const posts = [
      {
        imageUrl: 'https://babyology.com.au/wp-content/uploads/2019/08/child-dummy-august.jpg',
        description: 'bayi auk lagi ngapain',
        UserId: 2
      },
      {
        imageUrl: 'https://www.taxmann.com/post/wp-content/uploads/2022/08/10_Blog-Post-2.jpg',
        description: 'ceritanya ini jelasin dummy',
        UserId: 1
      },
    ]
    const data = posts.map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Posts', data, {})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
};
