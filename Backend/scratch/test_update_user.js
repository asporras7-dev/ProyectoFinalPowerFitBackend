async function testUpdate() {
    try {
        const payload = {
            avatar: "https://example.com/test-avatar.jpg"
        };

        const res = await fetch('http://localhost:3000/api/usuarios/16', {
            method: 'PATCH',
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

testUpdate();
