const { Model } = require('objection')
const tableNames = require('../../constants/tablename')

class User extends Model {
    static get tableName() {
        return tableNames.user
    }
    static get idColumn() {
        return 'user_id';
    }
}


module.exports = User 