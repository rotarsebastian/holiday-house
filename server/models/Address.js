const { Model } = require('objection');
const User = require(__dirname + '/./User.js');

class Address extends Model {
    static get tableName() {
        return 'addresses';
    }

    static get relationMappings() {
        return {
            user_address: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'addresses.user_id',
                    to: 'users.id'
                }
            }
        }
    };

}

module.exports = Address;