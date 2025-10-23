function verMascotas(lista = [], hayConexion = true) {
    if(hayConexion) {
        if (lista.length == 0) {
            return "Lo siento, por el momento no hay mascotas disponibles.";
        } else {
            return lista;
        }
    } else {
        return "Revise su conexión a internet.";
    }
}

function verDetalleMas(hayConexion = false, nomMas, mascotasInfo) {
    if (hayConexion) {
        let mascota;

        for (let i = 0; i<mascotasInfo.length; i++) {
            mascota = mascotasInfo[i];
            if(mascota[0] == nomMas){
                return mascota;
            }
        }
    } else {
        return "Revise su conexión a internet.";
    }
}

export {verMascotas, verDetalleMas};