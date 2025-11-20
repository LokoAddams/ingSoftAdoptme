import SolicitudAdopcionRepository from "../infraestructure/SolicitudAdopcionRepository";

class SolicitudAdopcionService {
  constructor() {
    this.solicitudAdopcionRepository = new SolicitudAdopcionRepository();
  }

  async createSolicitud(adoptante, mascota) {
    const fechaActual = new Date().toISOString();
    return await this.solicitudAdopcionRepository.create(adoptante, mascota, fechaActual);
  }
}

export default SolicitudAdopcionService;