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
async function result() {
  try {
    console.log(await read());
  } catch (err) {
    console.error(err);
  }
}
result();
