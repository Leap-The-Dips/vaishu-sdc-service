var faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return knex.raw('ALTER TABLE ' + 'products' + ' AUTO_INCREMENT = 1')
    })
    .then(function () {
      //Create array of fake products
      var fakeProducts = [];
      for (var i = 0; i < 100; i++) {
        if (i === 0) {
          fakeProducts.push({name: 'Star Wars Super Deluxe 24" Talking Plush: Chewbacca'});
        } else {
          fakeProducts.push({name: faker.random.words(3)});
        }
      }
      // Inserts seed entries
      return knex('products').insert(fakeProducts);
    });
};
