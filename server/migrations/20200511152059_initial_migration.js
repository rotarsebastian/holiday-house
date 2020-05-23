
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id').primary()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.date('birthdate').notNullable()
            table.string('email').unique().notNullable()
            table.string('password').notNullable()
            table.datetime('reset_pass_time')
            table.string('activate_or_reset_pass_key').notNullable()
            table.boolean('verified').notNullable().defaultTo(false)
            table.timestamp('created_at').defaultTo(knex.fn.now()) 
        })
        
        .createTable('properties', table => {
            table.increments('id').primary()
            table.string('title').notNullable()
            table.string('description', 3000).notNullable()
            table.date('available_start').notNullable()
            table.date('available_end').notNullable()
            table.integer('price').notNullable()
            table.integer('capacity').notNullable()
            table.string('type').notNullable()
            table.integer('rooms').notNullable()
            table.integer('beds').notNullable()
            table.integer('bathrooms').notNullable()
            table.json('address').notNullable()
            table.json('photos').notNullable()
            table.integer('user_id').unsigned().notNullable()
            table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
            table.timestamp('created_at').defaultTo(knex.fn.now()) 
        })

        .createTable('facilities', table => {
            table.increments('id').primary()
            table.string('facilities_list').notNullable()
            table.integer('property_id').unsigned().notNullable()
            table.foreign('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE')
        })

        .createTable('reservations', table => {
            table.increments('id').primary()
            table.date('from_date').notNullable()
            table.date('to_date').notNullable()
            table.integer('persons_count').notNullable()
            table.integer('reserved_by').unsigned().notNullable()
            table.foreign('reserved_by').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
            table.integer('property_id').unsigned().notNullable()
            table.foreign('property_id').references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('reservations')
        .dropTableIfExists('facilities')
        .dropTableIfExists('properties')
        .dropTableIfExists('users');
};
