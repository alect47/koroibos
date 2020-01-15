exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('events', function(table) {
      table.dropColumn('name');
      table.dropColumn('sex');
      table.dropColumn('age');
      table.dropColumn('height');
      table.dropColumn('weight');
      table.dropColumn('team');
      table.dropColumn('games');
      table.dropColumn('medal');

    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('events', function(table) {

      table.string('name');
      table.string('sex');
      table.integer('age');
      table.integer('height');
      table.integer('weight');
      table.string('team');
      table.string('games');
      table.string('medal');
    })
  ])
};
