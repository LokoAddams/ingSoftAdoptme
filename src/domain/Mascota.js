export default class Mascota {
  constructor({ id, nombre , img_ref , facilitador , especie , raza , sexo , edad , estado = 'disponible'} = {}) {
    this.id = id;
    this.nombre = nombre;
    this.img_ref = img_ref;
    this.facilitador = facilitador;
    this.especie = especie;
    this.raza = raza;
    this.sexo = sexo;
    this.edad = edad;
    this.estado = estado;
  }
}