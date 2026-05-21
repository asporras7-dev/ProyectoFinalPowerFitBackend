const { sequelize, Alergia } = require('../src/index');

async function check() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    const allergies = await Alergia.findAll();
    console.log("Current Allergies in DB:", allergies.map(a => a.toJSON()));
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

check();
