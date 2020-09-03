const tableNames = require('../../src/constants/tablename')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.roomStatus).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.roomStatus).insert([
        { status: 'free' },
        { status: 'booking' },
        { status: 'busy' }
      ]);
    });
};
