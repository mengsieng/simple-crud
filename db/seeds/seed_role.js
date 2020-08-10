const tableNames = require('../../src/constants/tablename')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.role).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.role).insert([
        { role: 'User' },
        { role: 'Admin' },
        { role: 'Staff' }
      ]);
    });
};
