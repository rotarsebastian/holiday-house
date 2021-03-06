const { Model } = require('objection');
const Property = require(__dirname + '/./Property.js');
const Reservation = require(__dirname + '/./Reservation.js');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    // ====================== ADD SCHEMA ======================
    static get jsonSchema() {
        return {
          type: 'object',
          required: ['first_name', 'last_name', 'birthdate', 'email', 'password', 'activate_or_reset_pass_key'],
    
          properties: {
            id: { type: 'integer' },

            first_name: { type: 'string', minLength: 2, maxLength: 50 },
            last_name: { type: 'string', minLength: 2, maxLength: 50 },

            birthdate: { 
                type: 'string', 
                minLength: 10, 
                maxLength: 10,
                pattern: '[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$'
            },
    
            email: {
              type: 'string',
              format: 'email',
              maxLength: 254,
              errorMessage: { format: 'Invalid email' }
            },
    
            password: { type: 'string', minLength: 6, maxLength: 80 },
            activate_or_reset_pass_key: { type: 'string', minLength: 36, maxLength: 36 },
          }
        };
    }
    
    // ====================== ADD RELATIONS ======================
    static get relationMappings() {
        return {
            properties: {
                relation: Model.HasManyRelation,
                modelClass: Property,
                join: {
                    from: 'users.id',
                    to: 'properties.user_id'
                }
            },

            reservations: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'users.id',
                    to: 'reservations.reserved_by'
                }
            }
        }
    };
}

module.exports = User;