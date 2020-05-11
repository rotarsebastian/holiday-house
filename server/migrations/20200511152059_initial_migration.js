
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id')
            table.string('username').unique()
            table.string('password')
            table.string('email').unique()
            table.string('first_name')
            table.string('last_name')
            table.string('company')
            table.datetime('reset_pass_time')
            table.string('activate_or_reset_pass_key')
            table.boolean('verified').notNullable().defaultTo(false)
            table.timestamp('created_at').defaultTo(knex.fn.now()) 
        })
        .createTable('addresses', table => {
            table.increments('id')
            table.string('address')
            table.string('postal_code')
            table.string('country')
            table.string('city')
            table.integer('user_id').unsigned().notNullable()
            table.foreign('user_id').references('users.id')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('addresses')
        .dropTableIfExists('users');
};
