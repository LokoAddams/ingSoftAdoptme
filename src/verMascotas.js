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

function verDetalleMas() {
    return "Revise su conexión a internet.";
}

export {verMascotas, verDetalleMas};