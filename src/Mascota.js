class Mascota {
  constructor({ nombre = '', especie = '', raza = '', sexo = '', edad = 0, estado = 'disponible' } = {}) {
    this.nombre = nombre;
    this.especie = especie;
    this.raza = raza;
    this.sexo = sexo;
    this.edad = typeof edad === 'number' ? edad : Number(edad) || 0;
    this.estado = estado;
  }
}

export default Mascota;