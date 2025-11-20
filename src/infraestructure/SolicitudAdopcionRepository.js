import SolicitudAdopcion from '../domain/SolicitudAdopcion.js';

class SolicitudAdopcionRepository {
  constructor(fechaActual) {
    this.fechaActual = fechaActual;
  }

  async checkOnline() {
    const timeout = 3000;
    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), timeout);

    const faviconUrl = (globalThis && globalThis.location && globalThis.location.origin)
      ? new URL('/favicon.ico', globalThis.location.origin).toString()
      : 'https://example.com/favicon.ico';

    try {
      await fetch(faviconUrl, { method: 'HEAD', cache: 'no-store', signal });
      clearTimeout(id);
      return true;
    } catch (err) {
      clearTimeout(id);
      return false;
    }
  }

  async create(adoptante, mascota, fechaActual) {
    const online = await this.checkOnline();
    if (!online) {
      throw new Error('No se puede crear una solicitud de adopción sin conexión a internet');
    }
    return new SolicitudAdopcion(adoptante, mascota, fechaActual);
  }
}
export default SolicitudAdopcionRepository;