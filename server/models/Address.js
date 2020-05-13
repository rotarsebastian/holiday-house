// const { Model } = require('objection');
// const Property = require(__dirname + '/./Property.js');

// class Address extends Model {
//     static get tableName() {
//         return 'addresses';
//     }

//     static get relationMappings() {
//         return {
//             property: {
//                 relation: Model.BelongsToOneRelation,
//                 modelClass: Property,
//                 join: {
//                     from: 'addresses.property_id',
//                     to: 'properties.id'
//                 }
//             }
//         }
//     };

// }

// module.exports = Address;

// ====================== NOT USING THIS - USE IT IF SOMETHING IS CHANGED ======================