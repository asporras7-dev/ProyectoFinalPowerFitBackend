const { Usuario, Perfil, PerfilSeguidores } = require('../src/index');

async function test() {
    try {
        console.log('Testing follow relationship...');
        
        // Find two profiles
        const profiles = await Perfil.findAll({ limit: 2 });
        if (profiles.length < 2) {
            console.error('Not enough profiles to test follow relationship.');
            process.exit(1);
        }

        const perfilA = profiles[0];
        const perfilB = profiles[1];

        console.log(`Perfil A: ID ${perfilA.id_perfil}, User ID ${perfilA.id_usuario}`);
        console.log(`Perfil B: ID ${perfilB.id_perfil}, User ID ${perfilB.id_usuario}`);

        console.log('Attempting to set following...');
        await perfilA.setFollowing([perfilB]);
        console.log('setFollowing completed successfully!');

        // Check if relationship is in DB
        const relations = await PerfilSeguidores.findAll();
        console.log('Current relationships in perfil_seguidor:');
        relations.forEach(r => {
            console.log(`- id_perfil: ${r.id_perfil}, id_seguidor: ${r.id_seguidor}`);
        });

    } catch (e) {
        console.error('Error during test:', e);
    } finally {
        process.exit(0);
    }
}

test();
