const { Model } = require('objection')
const tableNames = require('../../constants/tablename')

class Image extends Model {
    static get tableName() {
        return tableNames.roomImage
    }
    static get idColumn() {
        return 'id'
    }
}

class RoomType extends Model {
    static get tableName() {
        return tableNames.roomType
    }
    static get idColumn() {
        return 'id'
    }
    static get relationalMapping() {
        return {
            imageUrl: {
                relation: Model.HasManyRelation,
                modelClass: Image,
                join: {
                    from: "image_id",
                    to: 'id'
                }
            }
        }
    }
}

module.exports = RoomType