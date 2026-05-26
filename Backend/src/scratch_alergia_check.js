const { DatosUsuario } = require('./index');

async function main() {
    try {
        const dummy = DatosUsuario.build();
        console.log('--- DatosUsuario Instance Methods ---');
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(dummy))
            .filter(name => typeof dummy[name] === 'function');
        console.log(methods);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}

main();
