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

async function testPaginationAPI() {
  try {
    const data1 = await getJSON('http://localhost:3000/api/ejercicios?page=1&limit=5');
    console.log('--- PAGE 1 EXERCISES ---');
    data1.data.forEach((ex, idx) => console.log(`${idx + 1}. ${ex.nombre}`));

    const data2 = await getJSON('http://localhost:3000/api/ejercicios?page=2&limit=5');
    console.log('\n--- PAGE 2 EXERCISES ---');
    data2.data.forEach((ex, idx) => console.log(`${idx + 1}. ${ex.nombre}`));

  } catch (err) {
    console.error(err);
  }
}

testPaginationAPI();
