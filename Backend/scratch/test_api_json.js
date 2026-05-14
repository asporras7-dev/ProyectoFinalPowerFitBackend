// No need to require fetch in Node 18+

async function test() {
    try {
        const res = await fetch('http://localhost:3000/api/ejercicios');
        const data = await res.json();
        console.log('--- PRIMER EJERCICIO ---');
        console.log(JSON.stringify(data[0], null, 2));
    } catch (e) {
        console.error(e);
    }
}

test();
