
exports.up = function(knex) {
    return knex.schema.createTable('course', function (table) {

        table.increments();

        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('description').notNullable();
        table.decimal('score').notNullable();

        table.string('university_id').notNullable();

        // Chave estrangeira
        table.foreign('university_id').references('id').inTable('university');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('course')
};