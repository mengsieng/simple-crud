const { Model } = require('objection')

const tableNames = require('../../constants/tablename')
const RoomStatus = require('./room.status.model')
const RoomType = require('./room.type.model')

class Room extends Model {
    static get tableName() {
        return tableNames.room;
    }
    static get idColumn() {
        return 'id'
    }
    static get relationalMapping() {
        return {
            roomStatus: {
                relation: Model.HasOneRelation,
                modelClass: RoomStatus,
                join: {
                    from: 'room.roomtype_id',
                    to: 'roomStatus.id'
                }
            },
            roomType: {
                relation: Model.HasOneRelation,
                modelClass: RoomType,
                join: {
                    from: 'room.roomstatus_id',
                    to: 'roomType.id',
                }
            }
        }
    }
}

module.exports = Room