const { Model } = require('objection');
const Property = require(__dirname + '/./Property.js');

class PropertyFacilities extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            property: {
                relation: Model.BelongsToOneRelation,
                modelClass: Property,
                join: {
                    from: 'facilities.property_id',
                    to: 'properties.id'
                }
            }
        }
    };
}

module.exports = PropertyFacilities;