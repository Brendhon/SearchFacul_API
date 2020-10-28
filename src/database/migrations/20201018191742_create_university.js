exports.up = function(knex) {
    return knex.schema.createTable('university', function (table) {
        table.string('id').primary();
        table.string('IES').notNullable();
        table.string('telephone').notNullable();
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
