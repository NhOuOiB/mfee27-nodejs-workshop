const fsPromises = require('fs/promises');

async function read() {
  try {
    let promise = fsPromises.readFile('text.txt', 'utf8');
    console.log(await promise);
  } catch (err) {
    console.error(err);
  }
}
read();
