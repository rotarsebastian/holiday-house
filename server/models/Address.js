const { Model } = require('objection');
const Property = require(__dirname + '/./Property.js');
const User = require(__dirname + '/./User.js');

class Reservation extends Model {
    static get tableName() {
        return 'reservations';
    }

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

