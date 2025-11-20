export default class Mascota {
  constructor({ nombre = '', img_ref = '', facilitador = '', especie = '', raza = '', sexo = '', edad = 0, estado = 'disponible'} = {}) {
    this.nombre = nombre;
    this.img_ref = img_ref;
    this.facilitador = facilitador;
    this.especie = especie;
    this.raza = raza;
    this.sexo = sexo;
    this.edad = typeof edad === 'number' ? edad : Number(edad) || 0;
    this.estado = estado;
  }
}