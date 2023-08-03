'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const users = [
      {
        userName: 'buddy123',
        password: 'apapunitu',
        role: 'Admin'
      },
      {
        userName: 'lamanberanda',
        password: 'apaitu123',
        role: 'User'
      },
      {
        userName: 'tanpamu',
        password: 'akutaksanggup',
        role: 'User'
      },
      {
        userName: 'nobody',
        password: 'dadadada',
        role: 'Admin'
      },
    ]
    const data = users.map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Users', data, {})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
