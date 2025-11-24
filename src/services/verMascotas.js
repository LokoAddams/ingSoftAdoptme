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

function verDetalleMascota(hayConexion = false, nomMas, mascotasInfo) {
    if (hayConexion) {
        let mascota;

        for (let i = 0; i<mascotasInfo.length; i++) {
            mascota = mascotasInfo[i];
            if(mascota.nombre == nomMas){
                return mascota;
            }
        }
    } else {
        return "Revise su conexión a internet.";
    }
}

export {verMascotas, verDetalleMascota};