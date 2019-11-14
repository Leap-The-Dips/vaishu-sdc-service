const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];
const knex = require('knex')(config);

const getProductImages = function (id, callback) {
  const queries = [];

  queries.push(knex('products').where('id', id));
  queries.push(knex('images').where('product_id', id));

  Promise.all(queries)
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  getProductImages,
};
