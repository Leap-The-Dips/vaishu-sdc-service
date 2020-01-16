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

const deleteProductImages = function (id, callback) {
  knex('images').where('product_id', id).del()
  .then(() => {
    callback(null);
  })
  .catch((err) => {
    callback(err);
  });
};

const updateProductImage = function (id, image, callback) {
  knex('images').where('id', id)
  .update({img_small:image.img_small,
    img_large:image.img_large,
    img_zoom:image.img_zoom,
    product_id:image.prodId})
  .then(() => {
    callback(null);
  })
  .catch((err) => {
    console.log("err",err);
    callback(err);
  });
};

const insertProductImages = function (images, callback) {
  knex('images').insert(images)
  .then((results) => {
    console.log('insert results', results);
    callback(null, results);
  })
  .catch((err) => {
    callback(err);
  });
};

module.exports = {
  getProductImages,
  deleteProductImages,
  updateProductImage,
  insertProductImages
};
