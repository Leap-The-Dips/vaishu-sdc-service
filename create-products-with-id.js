/* 
Execute it with 'node create-products-with-id.js'
Script run time : 17mins
Creates 10000000 products.
*/


const fs = require('fs');
const faker = require('faker');

const writeImages = fs.createWriteStream('productswithid.csv');
writeImages.write('id,name\n', 'utf8');

function writeTenMillionImages(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let prodName = faker.random.words(3);
      if(prodName.includes(",")) prodName = `"${prodName}"`;
      const data = `${id},${prodName}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        if(i % 100000 === 0) {
          console.log(i);
        }
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionImages(writeImages, 'utf-8', () => {
  writeImages.end();
});
