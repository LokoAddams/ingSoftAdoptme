class SolicitudAdopcion {
  constructor(adoptante = null, mascota = null) {
    
    if (adoptante) this.adoptante = adoptante;
    if (mascota) this.mascota = mascota;

    this.estado = 'pendiente';
    this.fechaSolicitud = new Date().toISOString();
  }

  
}

export default SolicitudAdopcion;