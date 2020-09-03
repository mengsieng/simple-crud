const tableName = require('../../src/constants/tablename')


exports.up = async (knex) => {
    return await knex.schema.createTable(tableName.role, (table) => {
        table.increments('id').notNullable()
        table.string('role', 100)
    }).createTable(tableName.user, (table) => {
        table.increments('id').notNullable()
        table.string('username').notNullable()
        table.string('password', 127).notNullable()
        table.string('name')
        table.date('DOB')
        table.text('address')
        table.string('phonenumber', 15)
        table.text('profileUrl')
        table.integer('role_id').references('id').inTable(tableName.role).notNullable()
    }).createTable(tableName.roomType, (table) => {
        table.increments('id').notNullable()
        table.string('type').notNullable()
        table.float('price').notNullable()
        table.integer('bed').notNullable()
    }).createTable(tableName.roomStatus, (table) => {
        table.increments('id').notNullable()
        table.string('status').notNullable()
    }).createTable(tableName.room, (table) => {
        table.increments('id').notNullable()
        table.string('number').notNullable()
        table.integer('roomtype_id').references('id').inTable(tableName.roomType)
        table.integer('roomstatus_id').references('id').inTable(tableName.roomStatus)
    })
};

exports.down = async (knex) => {
    await knex.schema.dropTable(tableName.room)
        .dropTable(tableName.roomStatus)
        .dropTable(tableName.roomType)
        .dropTable(tableName.user)
        .dropTable(tableName.role)
};
