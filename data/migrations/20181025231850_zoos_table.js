
exports.up = function(knex, Promise) {
  return knex.schema.createTable('zoos', function(table) {
      table.increments();

      table.string('name', 255).notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('zoos');
};
