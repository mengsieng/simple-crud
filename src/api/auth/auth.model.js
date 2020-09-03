const { Model } = require('objection')

const tableNames = require('../../constants/tablename')
const Role = require('../role/role.model')

class User extends Model {
    static get tableName() {
        return tableNames.user
    }
    static get idColumn() {
        return 'id';
    }
    static get relationalMapping() {
        return {
            role: {
                relation: Model.HasManyRelation,
                modelClass: Role,
                join: {
                    from: 'user.role_id',
                    to: 'role.id',
                }
            }
        }
    }
}

module.exports = User