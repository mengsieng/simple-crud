const { Model } = require('objection')
const tableNames = require('../../constants/tablename')

class RoomType extends Model {
    static get tableName() {
        return tableNames.roomType
    }
    static get idColumn() {
        return 'id'
    }
}

module.exports = RoomType