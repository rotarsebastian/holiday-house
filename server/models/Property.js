const { Model } = require('objection');
const User = require(__dirname + '/./User.js');
const Reservation = require(__dirname + '/./Reservation.js');
const PropertyFacilities = require(__dirname + '/./PropertyFacilities.js');

class Property extends Model {
    static get tableName() {
        return 'properties';
    }
    // ====================== ADD SCHEMA ======================
    static get jsonSchema() {
        return {
          type: 'object',
          required: [
            'title', 'description', 'available_start', 'available_end', 'price',
            'capacity', 'type', 'rooms', 'beds', 'bathrooms', 'address', 'photos',
            'coordinates'
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
            capacity: { type: 'integer' },
            rooms: { type: 'integer' },
            beds: { type: 'integer' },
            bathrooms: { type: 'integer' },
    
            address: { 
                // type: 'object',
                // properties: {
                //     country: { type: 'string' },
                //     city: { type: 'string' },
                //     postal_code: { type: 'string' },
                //     property_address: { type: 'string' }
                // }
            },

          }
        }
    }

    // ====================== ADD RELATIONS ======================
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
            },

            reservations: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'properties.id',
                    to: 'reservations.property_id'
                }
            }
        }
    };
}

module.exports = Property;