const tableName = require('../../src/constants/tablename')


exports.up = async (knex) => {
    return await knex.schema.createTable(tableName.role, (table) => {
        table.increments('role_id').notNullable()
        table.string('role', 100)
    }).createTable(tableName.user, (table) => {
        table.increments('user_id').notNullable()
        table.string('username').notNullable()
        table.string('password', 127).notNullable()
        table.string('name')
        table.date('DOB')
        table.text('address')
        table.string('phonenumber', 15)
        table.text('profileUrl')
        table.integer('role_id').references('role_id').inTable(tableName.role).notNullable()
    })
};

exports.down = async (knex) => {
    await knex.schema.dropTable(tableName.role)
    await knex.schema.dropTable(tableName.user)
};
