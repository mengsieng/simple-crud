const { Model } = require('objection')
const tableNames = require('../../constants/tablename')

class Role extends Model {
    static get tableName() {
        return tableNames.role
    }
    static get idColumn() {
        return 'role_id'
    }
}
module.exports = Role 