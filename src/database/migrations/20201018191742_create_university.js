exports.up = function(knex) {
    return knex.schema.createTable('university', function (table) {

        table.increments('id').primary()

        table.string('ies').notNullable();
        table.string('telephone').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('uf', 2).notNullable();
        table.string('city').notNullable();
        table.string('address').notNullable();   
        table.string('category').notNullable();   
        table.string('site');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('university')
};
