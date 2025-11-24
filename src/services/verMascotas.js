async function verMascotas(hayConexion = true) {
    if(hayConexion) {
        const res = await fetch('http://localhost:3001/api/mascotas');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const mascotas = await res.json();
        if (!Array.isArray(mascotas) || mascotas.length === 0) {
            throw new Error("No hay mascotas disponibles.");
        }
        return mascotas;
    } else {
        throw new Error("Revise su conexión a internet.");
    }
}
async function verDetalleMascota(hayConexion = false, idMascota = null) {
    if (hayConexion) {
        if (idMascota) {
            try {
                const res = await fetch(`http://localhost:3001/api/mascotas/${encodeURIComponent(idMascota)}`);
                if (res.ok) {
                    return await res.json();
                } else {
                    throw new Error(`HTTP ${res.status}`);
                }
            } catch (err) {
                throw err; // <-- re-lanzar el error para que el llamador/tests lo reciban
            }
        } else {
            throw new Error('id de mascota no proporcionado.');
        }
    } else {
        throw new Error("Revise su conexión a internet.");
    }
}

export {verMascotas, verDetalleMascota};