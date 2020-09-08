const tableName = require('../../src/constants/tablename')


exports.up = async (knex) => {
    return await knex.schema.createTable(tableName.user, (table) => {
        table.increments('id').notNullable()
        table.string('username').notNullable()
        table.string('password', 127).notNullable()
        table.string('name')
        table.date('DOB')
        table.text('gender')
        table.string('phonenumber', 15)
        table.text('profileUrl')
    }).createTable(tableName.roomImage, (table) => {
        table.increments('id').notNullable()
        table.string('imageUrl').notNullable()
    }).createTable(tableName.roomType, (table) => {
        table.increments('id').notNullable()
        table.string('type').notNullable()
        table.string('description').notNullable()
        table.float('price').notNullable()
        table.integer('bed').notNullable()
        table.integer('image_id').references('id').inTable(tableName.roomImage)
    }).createTable(tableName.roomStatus, (table) => {
        table.increments('id').notNullable()
        table.string('status').notNullable()
    }).createTable(tableName.room, (table) => {
        table.increments('id').notNullable()
        table.string('number').notNullable()
        table.integer('roomtype_id').references('id').inTable(tableName.roomType)
        table.integer('roomstatus_id').references('id').inTable(tableName.roomStatus)
    }).createTable(tableName.bookingStatus, (table) => {
        table.increments('id').notNullable()
        table.string('status').notNullable()
    }).createTable(tableName.booking, (table) => {
        table.increments('id').notNullable()
        table.date('bookDate').notNullable()
        table.date('check_in_date').notNullable()
        table.integer('room_id').references('id').inTable(tableName.room)
        table.integer('user_id').references('id').inTable(tableName.user)
    })
};

exports.down = async (knex) => {
    await knex.schema.dropTable(tableName.booking)
        .dropTable(tableName.bookingStatus)
        .dropTable(tableName.room)
        .dropTable(tableName.roomStatus)
        .dropTable(tableName.roomType)
        .dropTable(tableName.roomImage)
        .dropTable(tableName.user)

};
