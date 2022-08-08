const fs = require('fs');
function read() {
  return new Promise((resolve, rejects) => {
    fs.readFile('text.txt', 'utf8', (err, msg) => {
      if (err) {
        return rejects(err);
      }
      return resolve(msg);
    });
  });
}
read()
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.error(err);
  });
