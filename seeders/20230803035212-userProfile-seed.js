'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const UserProfiles = [
      {
        firstName: 'Buddy',
        lastName: 'Siapakek',
        email: 'buddyDoremi@gmail.com',
        gender: 'Male',
        birthDate: new Date(),
        UserId: 1
      },
      {
        firstName: 'Laman',
        lastName: 'Beranda',
        email: 'lamanBeranda@gmail.com',
        gender: 'Female',
        birthDate: new Date(),
        UserId: 2
      },
      {
        firstName: 'Tanpamu',
        lastName: 'Soposi',
        email: 'soposikamu@gmail.com',
        gender: 'Female',
        birthDate: new Date(),
        UserId: 3
      },
      {
        firstName: 'Frey',
        lastName: 'Noon',
        email: 'signature@gmail.com',
        gender: 'Male',
        birthDate: new Date(),
        UserId: 4
      }
    ]
    const data = UserProfiles.map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('UserProfiles', data, {})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserProfiles', null, {})
  }
};
