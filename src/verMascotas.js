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

function verDetalleMas(hayConexion = false) {
    if (hayConexion) {
        return ["Apolo", "Perruno", "Pitbull", 2, "Macho", "Disponible", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg"];
    } else {
        return "Revise su conexión a internet.";
    }
}

export {verMascotas, verDetalleMas};