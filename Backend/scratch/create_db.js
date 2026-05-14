const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    try {
        console.log(`CREANDO BASE DE DATOS '${process.env.DB_NAME || 'powerfit'}' SI NO EXISTE...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'powerfit'}\`;`);
        console.log('BASE DE DATOS LISTA.');
    } catch (error) {
        console.error('ERROR AL CREAR LA BASE DE DATOS:', error.message);
    } finally {
        await connection.end();
    }
}

setupDatabase();
