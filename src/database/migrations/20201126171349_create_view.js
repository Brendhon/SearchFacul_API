exports.up = function (knex) {
    return knex.schema.raw(`CREATE VIEW IF NOT EXISTS v_course AS SELECT ??, ??, ??, ??, ??, ??, ??, ??, ?? 
        FROM course INNER JOIN university ON ?? = ??`, [
        "course.*",
        "university.IES",
        'university.email',
        'university.city',
        'university.telephone',
        'university.uf',
        'university.address',
        'university.category',
        'university.site',
        "university.id",
        "course.university_id"
    ])
};

exports.down = function (knex) {
    return knex.schema.raw('DROP VIEW v_course')
};
