
class SolicitudAdopcion {

  constructor(adoptante , mascota , fechaSolicitud ) {
    if (mascota && mascota.estado !== 'disponible'){
      throw new Error('La mascota no está disponible para adopción');
    }
    if (adoptante) this.adoptante = adoptante;
    if (mascota) this.mascota = mascota;

    this.estado = 'pendiente';
    this.fechaSolicitud = fechaSolicitud;
  }
}

export default SolicitudAdopcion;