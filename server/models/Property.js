const { Model } = require('objection');
const User = require(__dirname + '/./User.js');
const Address = require(__dirname + '/./Address.js');
const PropertyFacilities = require(__dirname + '/./PropertyFacilities.js');

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

    static get relationMappings() {
        return {
            property_address: {
                relation: Model.HasOneRelation,
                modelClass: Address,
                join: {
                    from: 'properties.id',
                    to: 'addresses.property_id'
                }
            }
        }
    };

    static get relationMappings() {
        return {
            facilities: {
                relation: Model.HasOneRelation,
                modelClass: PropertyFacilities,
                join: {
                    from: 'properties.id',
                    to: 'facilities.property_id'
                }
            }
        }
    };
}

module.exports = Property;