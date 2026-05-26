const http = require('http');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function testResponse() {
  try {
    const data = await getJSON('http://localhost:3000/api/ejercicios?page=1&limit=5');
    console.log('--- RESPONSE RAW ---');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

testResponse();
