
exports.up = function(knex, Promise) {
  return knex.schema.table('zoos', function(table) {
      table.boolean('hasPandas').defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('zoos', function(table) {
        table.dropColumn('hasPandas')
    })
};
