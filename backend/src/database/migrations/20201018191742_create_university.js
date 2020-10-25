exports.up = function(knex) {
    return knex.schema.createTable('university', function (table) {
        table.string('id').primary();
        table.string('universityName').notNullable();
        table.string('telephone').notNullable();
        table.string('uf', 2).notNullable();
        table.string('city').notNullable();
        table.string('street').notNullable();
        table.decimal('number').notNullable();
        table.string('site');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('university')
};
