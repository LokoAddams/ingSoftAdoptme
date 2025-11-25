describe('Solicitud de Adopción UI', () => {
  beforeEach(() => {
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
