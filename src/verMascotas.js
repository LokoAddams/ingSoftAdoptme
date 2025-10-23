function verMascotas(lista = []) {
    if (lista.length == 0) {
        return "Lo siento, por el momento no hay mascotas disponibles.";
    } else {
        return lista;
    }
}

export {verMascotas};