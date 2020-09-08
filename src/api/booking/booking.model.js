const { Model } = require('objection')

const tableNames = require('../../constants/tablename')

class Booking extends Model {
    static get tableName() {
        return tableNames.booking;
    }
    static get idColum() {
        return 'id';
    }
}

module.exports = Booking