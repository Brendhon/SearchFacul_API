exports.up = function(knex) {
    return knex.schema.createTable('university', function (table) {
        table.string('id').primary();
        table.string('universityName').notNullable();
        table.string('telephone').notNullable();
        table.string('uf', 2).notNullable();
        table.string('city').notNullable();
        table.string('longitude').notNullable();
        table.string('latitude').notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('university')
};
