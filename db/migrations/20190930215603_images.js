
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', table => {
    table.increments('id')
    table.string('img_small')
    table.string('img_large')
    table.string('img_zoom')
    table.integer('product_id').unsigned()
    table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images')
};
