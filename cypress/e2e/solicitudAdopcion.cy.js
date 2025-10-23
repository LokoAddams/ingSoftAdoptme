describe('Solicitud de Adopción UI', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/')
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

    cy.get('#mascotaNombre').type('Luna')
    cy.get('#mascotaEspecie').type('Perro')
    cy.get('#mascotaRaza').type('Labrador')
    cy.get('#mascotaSexo').type('Hembra')
    cy.get('#mascotaEdad').type('2')
    cy.get('#mascotaEstado').select('disponible')

    cy.get('#enviarSolicitudBtn').click()

    cy.get('#solicitudMensaje').should('contain.text', 'Solicitud enviada correctamente')

    cy.window().its('__ultimaSolicitudAdopcion').should('exist').then((sol) => {
      expect(sol).to.have.property('adoptante')
      expect(sol).to.have.property('mascota')
      expect(sol.adoptante.nombre).to.equal('Juan Pérez')
      expect(sol.mascota.nombre).to.equal('Luna')
      expect(sol.estado).to.equal('pendiente')
    })
  })
})
