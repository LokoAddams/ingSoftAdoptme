export default class ValidarConexion {
  validarConexionInternet() {
    if (!navigator.onLine) {
      throw new Error("Revise su conexión a internet.");
    }
  }

  async validarConexionBackend() {
    const _hostname =
    typeof window !== "undefined" && window.location && window.location.hostname
      ? window.location.hostname
      : "localhost";

    const API_URL =
      _hostname === "localhost"
        ? "http://localhost:3001" // desarrollo
        : "https://ingsoftadoptme.onrender.com"; // producción

      const respuesta = await fetch(`${API_URL}/api/mascotas`);
    if (!respuesta.ok) {
      throw new Error("Hubo un error con la conexion a nuestro servidor.");
    }
  }
}