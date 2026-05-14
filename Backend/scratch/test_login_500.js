async function testLogin() {
    try {
        const payload = {
            correo: "admin@powerfit.com",
            contrasenia: "admin123"
        };

        const res = await fetch('http://localhost:3000/api/usuarios/login', {
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

testLogin();
