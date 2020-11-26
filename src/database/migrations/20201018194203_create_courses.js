exports.up = function(knex) {
    return knex.schema.createTable('course', function (table) {

        table.increments();

        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('duration').notNullable();
        table.string('titration').notNullable();
        table.string('modality').notNullable();
        table.decimal('score');

        table.string('university_id').notNullable();

        // Chave estrangeira
        table.foreign('university_id').references('id').inTable('university');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('course')
};
