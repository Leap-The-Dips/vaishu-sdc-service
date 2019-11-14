
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products')
};
