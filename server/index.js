const express = require('express');

const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3003;
var bodyParser = require('body-parser');
const db = require('../db/index.js');

app.use(compression());
app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.json());
app.get('/images', (req, res) => {
  const { id } = req.query;

  // Get data from database
  db.getProductImages(id, (err, results) => {
    if (err) {
      console.log('Query error: ', err);
      res.sendStatus(400);
      return;
    }
    const data = { name: results[0][0].name };
    const imgArray = results[1].map((x) => (
      {
        small: x.img_small,
        large: x.img_large,
        zoom: x.img_zoom,
      }
    ));
    data.images = imgArray;
    res.status(200).send(data);
  });
});

app.post('/images', (req, res) => {
  const { id } = req.query;
  const images = req.body.images;
  const data = [];
  for(let i = 0;i < images.length;i++) {
    data.push({
      img_small:images[i].img_small,
      img_large:images[i].img_large,
      img_zoom:images[i].img_zoom,
      product_id:+id
    });
  }
  db.insertProductImages(data, (err, results) => {
    if (err) {
      console.log('Query error: ', err);
      res.sendStatus(400);
      return;
    }
    res.status(201).send(results);
  });
});

app.put('/images', (req, res) => {
  const { id } = req.query;
  const image = req.body.image;
  db.updateProductImage(id, image, (err) => {
    if (err) {
      console.log('Query error: ', err);
      res.sendStatus(400);
      return;
    }
    res.sendStatus(200);
  });
});

app.delete('/images', (req, res) => {
  const { id } = req.query;
  db.deleteProductImages(id, (err) => {
    if (err) {
      console.log('Query error: ', err);
    }
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
