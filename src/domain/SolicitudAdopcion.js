import Adoptante from "./Adoptante";

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

  getEstado(){
    return this.estado;
  }
  setEstado(nuevoEstado){
    this.estado = nuevoEstado;
  }

  getAdoptante(){
    return this.adoptante;
  }

  getMascota(){
    return this.mascota;
  }

  getFechaSolicitud(){
    return this.fechaSolicitud;
  }
}

export default SolicitudAdopcion;