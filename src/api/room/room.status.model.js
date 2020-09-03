const { Model } = require('objection')
const tableNames = require('../../constants/tablename')

class RoomStatus extends Model {
    static get tableName() {
        return tableNames.roomStatus
    }
    static get columnId() {
        return 'id';
    }
}

module.exports = RoomStatus