const { Model } = require('objection');
const Property = require(__dirname + '/./Property.js');
const User = require(__dirname + '/./User.js');

class Reservation extends Model {
    static get tableName() {
        return 'reservations';
    }

    // ====================== ADD SCHEMA ======================
    static get jsonSchema() {
        return {
          type: 'object',
          required: ['from_date', 'to_date', 'persons_count'],
    
          properties: {
            id: { type: 'integer' },

            from_date: { 
                type: 'string', 
                minLength: 10, 
                maxLength: 10,
                pattern: '[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$'
            },

            to_date: { 
                type: 'string', 
                minLength: 10, 
                maxLength: 10,
                pattern: '[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$'
            },
    
            persons_count: { type: 'integer' }
          }
        };
    }

    // ====================== ADD RELATIONS ======================
    static get relationMappings() {
        return {
            reservation_property: {
                relation: Model.BelongsToOneRelation,
                modelClass: Property,
                join: {
                    from: 'reservations.property_id',
                    to: 'properties.id'
                }
            },

            reserved_for: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'reservations.reserved_by',
                    to: 'users.id'
                }
            }
        }
    };

}

module.exports = Reservation;

