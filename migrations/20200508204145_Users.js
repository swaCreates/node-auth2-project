
exports.up = function(knex) {
    return knex.schema
    .createTable('Users', tbl => {
        tbl.increments();
        tbl.text('username').notNullable().unique();
        tbl.text('password').notNullable();
        tbl.text('department').notNullable();
    });
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('Users');
};
