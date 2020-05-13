const { Model } = require('objection');
const Property = require(__dirname + '/./Property.js');

class PropertyFacilities extends Model {
    static get tableName() {
        return 'facilities';
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

// A PROPERTY CAN EXIST WITHOUT FACILITIES - SO WE CREATE THIS IF PEOPLE WANT TO ADD FACILITIES TO THEIR PLACE

module.exports = PropertyFacilities;