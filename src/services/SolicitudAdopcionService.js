import SolicitudAdopcionRepository from "../infraestructure/SolicitudAdopcionRepository";

class SolicitudAdopcionService {
  constructor(solicitudAdopcionRepository) {
    this.solicitudAdopcionRepository = solicitudAdopcionRepository;
  }

  async createSolicitud(adoptante, mascota) {
    const fechaActual = new Date().toISOString();
    return await this.solicitudAdopcionRepository.create(adoptante, mascota, fechaActual);
  }
}

export default SolicitudAdopcionService;