const { Model } = require('objection');
const User = require(__dirname + '/./User.js');
const PropertyFacilities = require(__dirname + '/./PropertyFacilities.js');

class Property extends Model {
    static get tableName() {
        return 'properties';
    }

    static get jsonSchema() {
        return {
          type: 'object',
          required: [
            'title', 'description', 'available_start', 'available_end', 'price',
            'capacity', 'type', 'rooms', 'beds', 'bathrooms', 'address', 'photos'
        ],
    
          properties: {
            id: { type: 'integer' },

            title: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },

            available_start: { 
                type: 'string', 
                minLength: 10, 
                maxLength: 10,
                pattern: '[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$'
            },
            available_end: { 
                type: 'string', 
                minLength: 10, 
                maxLength: 10,
                pattern: '[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$'
            },

            price: { type: 'number' },
            capacity: { type: 'number' },
            rooms: { type: 'integer' },
            beds: { type: 'integer' },
            bathrooms: { type: 'integer' },
    
            address: { type: 'string' },

          }
        }
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
            },

            facilities: {
                relation: Model.HasOneRelation,
                modelClass: PropertyFacilities,
                filter: query => query.select('facilities.facilities_list'),
                join: {
                    from: 'properties.id',
                    to: 'facilities.property_id'
                }
            }
        }
    };
}

module.exports = Property;