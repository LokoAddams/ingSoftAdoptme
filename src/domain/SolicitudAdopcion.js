import Adoptante from "./Adoptante";

class SolicitudAdopcion {
  constructor(adoptante , mascota ) {
    // Nota: la verificación de conexión real se hace mediante el factory async
    if (mascota && mascota.estado !== 'disponible'){
      throw new Error('La mascota no está disponible para adopción');
    }
    if (adoptante) this.adoptante = adoptante;
    if (mascota) this.mascota = mascota;

    this.estado = 'pendiente';
    this.fechaSolicitud = new Date().toISOString();
  }

  // Realiza una verificación básica de conectividad intentando una petición HEAD
  // a un recurso pequeño (por ejemplo /favicon.ico). Devuelve true si la
  // petición tuvo éxito y false en caso contrario.
  static async checkOnline(timeout = 3000) {
    if (typeof fetch !== 'function') {
      // En entornos sin fetch asumimos online (fallback)
      return true;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      // Usamos HEAD y cache no-store para forzar verificación de red
      await fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store', signal });
      clearTimeout(id);
      return true;
    } catch (err) {
      clearTimeout(id);
      return false;
    }
  }

  // Factory asíncrona que verifica conectividad antes de crear la instancia.
  static async create(adoptante, mascota) {
    const online = await SolicitudAdopcion.checkOnline();
    if (!online) {
      throw new Error('No se puede crear una solicitud de adopción sin conexión a internet');
    }
    return new SolicitudAdopcion(adoptante, mascota);
  }

  
}

export default SolicitudAdopcion;