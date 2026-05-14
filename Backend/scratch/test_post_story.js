

async function testPost() {
    try {
        const payload = {
            titulo: "Test Story",
            texto: "This is a test story",
            imagen: "",
            categoria_nombre: "Pérdida de Peso",
            Usuario_idUsuario: 1, // Assumes user 1 exists
            tiempo_Publicacion: new Date().toISOString()
        };

        console.log("Sending payload:", payload);

        const res = await fetch('http://localhost:3000/api/publicaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("Response status:", res.status);
        console.log("Response data:", data);
    } catch (err) {
        console.error("Error:", err);
    }
}

testPost();
