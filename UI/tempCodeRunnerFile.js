const mascota = new Mascota({
        nombre: (document.getElementById('mascotaNombre') || {}).value || '',
        especie: (document.getElementById('mascotaEspecie') || {}).value || '',
        raza: (document.getElementById('mascotaRaza') || {}).value || '',
        sexo: (document.getElementById('mascotaSexo') || {}).value || '',
        edad: Number((document.getElementById('mascotaEdad') || {}).value) || 0,
        estado: (document.getElementById('mascotaEstado') || {}).value || 'disponible',
      });