import SolicitudAdopcionRepository from "../infraestructure/SolicitudAdopcionRepository";

class SolicitudAdopcionService {
  constructor(solicitudAdopcionRepository, validarConexion) {
    this.solicitudAdopcionRepository = solicitudAdopcionRepository;
    this.validarConexion = validarConexion;
  }

  async createSolicitud(mascotaId, adoptanteNombre) {
    await this.validarConexion.validarConexionInternet();
    await this.validarConexion.validarConexionBackend();
    return await this.solicitudAdopcionRepository.create(mascotaId, adoptanteNombre);
  }

  async getTodasLasSolicitudes() {
    return await this.solicitudAdopcionRepository.obtenerTodasSolicitudes();
  }

  async actualizarEstadoSolicitud(solicitudId, nuevoEstado) {
    await this.validarConexion.validarConexionInternet();
    await this.validarConexion.validarConexionBackend();
    return await this.solicitudAdopcionRepository.actualizarEstado(solicitudId, nuevoEstado);
  }
}

export default SolicitudAdopcionService;