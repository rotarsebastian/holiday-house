const { Model } = require('objection');
const User = require(__dirname + '/./User.js');

class Property extends Model {
    static get tableName() {
        return 'properties';
    }

    static get relationMappings() {
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'properties.user_id',
                    to: 'users.id'
                }
            }
        }
    };
}

module.exports = Property;