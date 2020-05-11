const { Model } = require('objection');
const Address = require(__dirname + '/./Address.js');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            user_address: {
                relation: Model.HasOneRelation,
                modelClass: Address,
                join: {
                    from: 'users.id',
                    to: 'addresses.user_id'
                }
            }
        }
    };
}

module.exports = User;