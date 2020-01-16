/* 
Execute it with 'node create-images.js'
Script run time : 5.30mins
Creates 89978964 images.
Script run time : 202.23492092s(3.3min) for ~45000000. 
*/

const fs = require('fs');
const faker = require('faker');

const writeImages = fs.createWriteStream('images-with-id10M.csv');
writeImages.write('id,img_small,img_large,img_zoom,product_id\n', 'utf8');

function writeTenMillionImages(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  
  const imageList = [
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64.jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500.jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600.jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(1).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(1).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(1).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(2).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(2).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(2).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(3).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(3).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(3).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(4).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(4).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(4).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(5).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(5).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(5).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(6).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(6).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(6).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(7).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l300+(1).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(7).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(8).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(2).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(8).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(9).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(3).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(9).jpg'],
    [ 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(10).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(4).jpg', 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(10).jpg']
  ];
  let count = 0;

  function write() {
    let ok = true;
    let data;
    let start;
    do {
      i -= 1;
      id += 1;
      imgCnt = Math.floor(Math.random() * 6) + 1;
      start = (imgCnt > 3) ? 3 : 0;  
      var result = imageList.slice(start, imgCnt);
      data = '';
      for (var j = 0; j < result.length; j++) {
        result[j][3] = id;
        data += `${faker.random.uuid()},${result[j].join(',')}\n`;
      }
      if (i === 1) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionImages(writeImages, 'utf-8', () => {
  console.log('Exe time',process.uptime());
  writeImages.end();
});
