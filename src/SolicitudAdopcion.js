import Adoptante from "./Adoptante.js";

class SolicitudAdopcion {
  constructor(adoptante , mascota ) {
    
    if (adoptante) this.adoptante = adoptante;
    if (mascota) this.mascota = mascota;

    this.estado = 'pendiente';
    this.fechaSolicitud = new Date().toISOString();
  }

  
}

export default SolicitudAdopcion;