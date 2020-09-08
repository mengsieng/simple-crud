const tableNames = require('../../src/constants/tablename')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.bookingStatus).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.bookingStatus).insert([
        { status: 'BOOKING' },
        { status: 'IN' },
        { status: 'OUT' },
      ]);
    });
};
