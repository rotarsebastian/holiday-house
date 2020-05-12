
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id')
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.string('birthdate').notNullable()
            table.string('email').unique().notNullable()
            table.string('password').notNullable()
            table.datetime('reset_pass_time')
            table.string('activate_or_reset_pass_key').notNullable()
            table.boolean('verified').notNullable().defaultTo(false)
            table.timestamp('created_at').defaultTo(knex.fn.now()) 
        })
        
        .createTable('properties', table => {
            table.increments('id')
            table.string('title').notNullable()
            table.datetime('available_start').notNullable()
            table.datetime('available_end').notNullable()
            table.integer('price').notNullable()
            table.integer('capacity').notNullable()
            table.string('type').notNullable()
            table.integer('rooms').notNullable()
            table.integer('beds').notNullable()
            table.integer('bathrooms').notNullable()
            table.integer('user_id').unsigned().notNullable()
            table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
        })

        .createTable('facilities', table => {
            table.increments('id')
            table.string('facilities_list').notNullable()
            table.integer('property_id').unsigned().notNullable()
            table.foreign('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE')
        })

        .createTable('addresses', table => {
            table.increments('id')
            table.string('address').notNullable()
            table.string('city').notNullable()
            table.string('country').notNullable()
            table.string('postal_code').notNullable()
            table.integer('property_id').unsigned().notNullable()
            table.foreign('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('addresses')
        .dropTableIfExists('facilities')
        .dropTableIfExists('properties')
        .dropTableIfExists('users');
};
