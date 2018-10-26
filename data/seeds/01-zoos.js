
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('zoos')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('zoos').insert([
        {name: 'Los Angeles Zoo', hasPandas: false},
        {name: 'San Diego Zoo', hasPandas: true},
        {name: 'San Diego Zoo Safari Park', hasPandas: false}
      ]);
    });
};

//for seeds:
    //knex seed:make ______ insert name of file
    //knex seed:run ....generates seed file to populate test data