'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserProfiles', 'bio', {type: Sequelize.STRING})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserProfiles', 'bio', {})
  }
};