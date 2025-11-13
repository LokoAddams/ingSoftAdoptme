const botonEnviarSolicitud = document.getElementById('enviarSolicitudBtn');
let registroMensajeDiv = document.getElementById('registroMensaje');
const Estado = document.getElementById('MarcarEstado');


if (botonEnviarSolicitud) {
    botonEnviarSolicitud.addEventListener('click', () => {
      const adoptante = {
        nombre: (document.getElementById('adoptanteNombre') || {}).value || '',
        cuestionario: {
          responsabilidad: (document.getElementById('cuestionarioResponsabilidad') || {}).value || '',
          ambiente: (document.getElementById('cuestionarioAmbiente') || {}).value || '',
          Problemas_de_salud: (document.getElementById('cuestionarioProblemasSalud') || {}).value || '',
          ninos: (document.getElementById('cuestionarioNinos') || {}).value || '',
          otras_mascotas: (document.getElementById('cuestionarioOtrasMascotas') || {}).value || '',
          economia: Number((document.getElementById('cuestionarioEconomia') || {}).value) || 0,
        },
        contacto: {
          email: (document.getElementById('adoptanteEmail') || {}).value || '',
          telefono: (document.getElementById('adoptanteTelefono') || {}).value || '',
        }
      };

      const mascota = {
        nombre: (document.getElementById('mascotaNombre') || {}).value || '',
        especie: (document.getElementById('mascotaEspecie') || {}).value || '',
        raza: (document.getElementById('mascotaRaza') || {}).value || '',
        sexo: (document.getElementById('mascotaSexo') || {}).value || '',
        edad: Number((document.getElementById('mascotaEdad') || {}).value) || 0,
        estado: (document.getElementById('mascotaEstado') || {}).value || 'disponible',
      };
      
      console.log("hola1");
      Promise.all([
        import('../SolicitudAdopcion.js'),
        import('../Adoptante.js'),
        import('../Mascota.js')
      ]).then(([{ default: SolicitudAdopcion }, { default: Adoptante }, { default: Mascota }]) => {
        (async () => {
          try {
            const adoptanteInstance = new Adoptante(adoptante);
            const mascotaInstance = new Mascota(mascota);
            // usar la factory asíncrona que valida conectividad
            const solicitud = await SolicitudAdopcion.create(adoptanteInstance, mascotaInstance);

            window.__ultimaSolicitudAdopcion = solicitud;
            const mensajeDiv = document.getElementById('solicitudMensaje');
            if (mensajeDiv) mensajeDiv.innerText = 'Solicitud enviada correctamente';
          } catch (err) {
            const mensajeDiv = document.getElementById('solicitudMensaje');
            if (mensajeDiv) mensajeDiv.innerText = err && err.message ? err.message : 'Error al crear la solicitud';
            console.error('Error creando SolicitudAdopcion', err);
          }
        })();
      }).catch((err) => {
        const mensajeDiv = document.getElementById('solicitudMensaje');
        if (mensajeDiv) mensajeDiv.innerText = err.message || 'Error al enviar la solicitud';
        console.error('Error creando SolicitudAdopcion', err);
      });
    });
  }