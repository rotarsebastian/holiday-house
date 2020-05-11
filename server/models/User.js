const { Model } = require('objection');
const Property = require(__dirname + '/./Property.js');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            properties: {
                relation: Model.HasManyRelation,
                modelClass: Property,
                join: {
                    from: 'users.id',
                    to: 'properties.user_id'
                }
            }
        }
    };
}

module.exports = User;