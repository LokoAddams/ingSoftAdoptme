describe('Solicitud de Adopción UI', () => {
  beforeEach(() => {
    // Interceptar health-check y endpoints de API para evitar dependencia del backend
    cy.intercept('GET', 'http://localhost:3001/**', { statusCode: 200, body: {} }).as('health');
    cy.intercept('GET', 'http://localhost:3001/api/mascotas/*', {
      statusCode: 200,
      body: {
        id: '6925071aa83df10a4b76900c',
        nombre: 'Fido',
        especie: 'Perro',
        raza: 'Criollo',
        sexo: 'Macho',
        edad: 3,
        estado: 'Disponible'
      }
    }).as('getMascota');
    cy.intercept('POST', 'http://localhost:3001/api/solicitudes', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          mascotaId: '6925071aa83df10a4b76900c',
          adoptanteNombre: 'Juan Pérez',
          estado: 'pendiente',
          fechaSolicitud: new Date().toISOString(),
          id: 'generated-id-123'
        }
      });
    }).as('postSolicitud');

    // Visitar la página con id de mascota específico para las pruebas
    cy.visit('http://localhost:1234/UI/FormSolicitudAdopcion.html?id=6925071aa83df10a4b76900c')
  })

  it('Debería crear una SolicitudAdopcion al enviar el formulario', () => {
    
    cy.get('#adoptanteNombre').type('Juan Pérez')
    cy.get('#adoptanteEmail').type('juan.perez@example.com')
    cy.get('#adoptanteTelefono').type('555-1234')

    // Expandir sección del cuestionario si está colapsada
    cy.get('details').then($d => {
      const summary = $d.find('summary')
      if (summary.length) {
        cy.wrap(summary).click()
      }
    })

    cy.get('#cuestionarioResponsabilidad').should('be.visible').type('Porque quiero compañía y cuidar de un animal')
    cy.get('#cuestionarioAmbiente').type('grande')
    cy.get('#cuestionarioProblemasSalud').type('No')
    cy.get('#cuestionarioNinos').type('Si')
    cy.get('#cuestionarioOtrasMascotas').type('No')
    cy.get('#cuestionarioEconomia').type('500')

    

    cy.get('#enviarSolicitudBtn').click()

    cy.get('#solicitudMensaje').should('contain.text', 'Solicitud enviada correctamente')

    
  })
})



describe('Solicitud de Adopción UI', () => {
  beforeEach(() => {
    // Interceptar health-check y endpoints de API para evitar dependencia del backend
    cy.intercept('GET', 'http://localhost:3001/**', { statusCode: 200, body: {} }).as('health');
    // Responder GET mascota como NO disponible
    cy.intercept('GET', 'http://localhost:3001/api/mascotas/*', {
      statusCode: 200,
      body: {
        id: '6924f95da3569087c92ce8b1',
        nombre: 'Luna',
        especie: 'Perro',
        raza: 'Labrador',
        sexo: 'Hembra',
        edad: 2,
        estado: 'en proceso'
      }
    }).as('getMascota');
    // POST devuelve error indicando mascota no disponible
    cy.intercept('POST', 'http://localhost:3001/api/solicitudes', (req) => {
      req.reply({ statusCode: 400, body: { message: 'La mascota no está disponible para adopción' } });
    }).as('postSolicitud');

    // Visitar la página con id de mascota específico para las pruebas
    cy.visit('http://localhost:1234/UI/FormSolicitudAdopcion.html?id=6924f95da3569087c92ce8b1')
  })
  it('Debería mostrar un mensaje si la mascota no está disponible para adopción', () => {
    cy.get('#adoptanteNombre').type('Juan Pérez')
    cy.get('#adoptanteEmail').type('juan.perez@example.com')
    cy.get('#adoptanteTelefono').type('555-1234')

    // Expandir sección del cuestionario si está colapsada
    cy.get('details').then($d => {
      const summary = $d.find('summary')
      if (summary.length) {
        cy.wrap(summary).click()
      }
    })

    cy.get('#cuestionarioResponsabilidad').should('be.visible').type('Porque quiero compañía y cuidar de un animal')
    cy.get('#cuestionarioAmbiente').type('grande')
    cy.get('#cuestionarioProblemasSalud').type('No')
    cy.get('#cuestionarioNinos').type('Si')
    cy.get('#cuestionarioOtrasMascotas').type('No')
    cy.get('#cuestionarioEconomia').type('500')

    

    cy.get('#enviarSolicitudBtn').click()

    cy.get('#solicitudMensaje').should('contain.text', 'La mascota no está disponible para adopción')
  })

  it('Debería mostrar un mensaje cuando la verificación de conectividad falla', () => {
    // interceptar la comprobación de conectividad y forzar error de red
    cy.intercept({ method: 'HEAD', url: '**/favicon.ico' }, { forceNetworkError: true }).as('checkOnline');
    // stub navigator.onLine en la ventana para simular offline
    cy.window().then((win) => {
      Object.defineProperty(win.navigator, 'onLine', { value: false, configurable: true });
    });
    cy.get('#adoptanteNombre').type('Juan Pérez')
    cy.get('#adoptanteEmail').type('juan.perez@example.com')
    cy.get('#adoptanteTelefono').type('555-1234')

    // Expandir sección del cuestionario si está colapsada
    cy.get('details').then($d => {
      const summary = $d.find('summary')
      if (summary.length) {
        cy.wrap(summary).click()
      }
    })

    cy.get('#cuestionarioResponsabilidad').should('be.visible').type('Porque quiero compañía y cuidar de un animal')
    cy.get('#cuestionarioAmbiente').type('grande')
    cy.get('#cuestionarioProblemasSalud').type('No')
    cy.get('#cuestionarioNinos').type('Si')
    cy.get('#cuestionarioOtrasMascotas').type('No')
    cy.get('#cuestionarioEconomia').type('500')

    

    cy.get('#enviarSolicitudBtn').click()

    // Esperar a que la comprobación (interceptada) ocurra y luego verificar el mensaje
    cy.get('#solicitudMensaje').should('contain.text', 'Revise su conexión a internet.')
  })
})
