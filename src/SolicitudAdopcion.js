import Adoptante from "./Adoptante.js";

class SolicitudAdopcion {
  constructor(adoptante , mascota ) {
    if(mascota.estado !== 'disponible'){
      throw new Error('La mascota no está disponible para adopción');
    }
    if (adoptante) this.adoptante = adoptante;
    if (mascota) this.mascota = mascota;

    this.estado = 'pendiente';
    this.fechaSolicitud = new Date().toISOString();
  }

  
}

export default SolicitudAdopcion;