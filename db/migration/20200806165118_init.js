const tableName = require('../../src/constants/tablename')


exports.up = async (knex) => {
    return await knex.schema.createTable(tableName.user, (table) => {
        table.increments()
        table.text('email')
        table.text('password')
    })
};

exports.down = async (knex) => {
    return await knex.schema.dropTable(tableName.user)
};
