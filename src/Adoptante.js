class Adoptante {
  constructor({ nombre = '', cuestionario = {}, contacto = {} } = {}) {
    this.nombre = nombre;
    this.cuestionario = {
      responsabilidad: cuestionario.responsabilidad || '',
      ambiente: cuestionario.ambiente || '',
      Problemas_de_salud: cuestionario.Problemas_de_salud || '',
      ninos: cuestionario.ninos ||  '',
      otras_mascotas: cuestionario.otras_mascotas || '',
      economia: typeof cuestionario.economia === 'number' ? cuestionario.economia : Number(cuestionario.economia) || 0,
    };
    this.contacto = {
      email: contacto.email || '',
      telefono: contacto.telefono || '',
    };
  }
}

export default Adoptante;