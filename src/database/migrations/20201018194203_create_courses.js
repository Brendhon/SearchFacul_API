exports.up = function(knex) {
    return knex.schema.createTable('course', function (table) {

        table.increments();

        table.string('name').notNullable();
        table.string('description', 1000).notNullable();
        table.integer('duration').notNullable();
        table.string('titration').notNullable();
        table.string('modality').notNullable();
        table.string('period').notNullable();
        table.integer('score');

        table.integer('university_id').notNullable();

        // Chave estrangeira
        table.foreign('university_id').references('id').inTable('university');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('course')
};
