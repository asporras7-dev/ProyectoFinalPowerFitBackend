const { register } = require('./controllers/AuthController');
const sequelize = require('./config/db');

async function testRegister() {
  try {
    const mockReq = {
      body: {
        correo: `test_reg_${Date.now()}@test.com`,
        contrasenia: 'password123',
        nombre: 'Registro Test User',
        edad: 25,
        sexo: 'Masculino',
        altura: 1.75,
        peso: 75.0,
        lugarEntrenamiento: 'Casa',
        alergias: 'Frutos secos / Nueces, Lácteos / Lactosa Adicional: Maní',
        pesoMeta: 70.0,
        plazoSemanas: 8,
        deficitEstimado: 450
      }
    };

    const mockRes = {
      status: function(code) {
        console.log(`[Status Code]: ${code}`);
        return this;
      },
      json: function(data) {
        console.log('[JSON Response]:', JSON.stringify(data, null, 2));
        return this;
      }
    };

    console.log('Running AuthController.register with mock data...');
    await register(mockReq, mockRes);
  } catch (err) {
    console.error('Test registered threw error:', err);
  } finally {
    process.exit(0);
  }
}

testRegister();
