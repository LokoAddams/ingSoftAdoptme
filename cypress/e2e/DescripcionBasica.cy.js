describe('File Upload Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/descripcion-basica')
    })

    it('Deberia poder seleccionar un archivo', () => {
        const fileName = 'test-image.jpg'
        cy.get('input[type="file"]').attachFile(fileName)
      cy.get('input[type="file"]').should('have.value', fileName)
    });
    it('Deberia mostrar el nombre del archivo seleccionado', () => {
        const fileName = 'test-image.jpg'
        cy.get('input[type="file"]').attachFile(fileName)
        cy.get('#archivoSeleccionado').should('contain.text', `Archivo seleccionado: ${fileName}`)
    });
    it('Deberia mostrar mensaje cuando no hay archivo seleccionado', () => {
        cy.get('#archivoSeleccionado').should('contain.text', 'No hay archivo seleccionado')
    });
    it('Deberia abrir el selector de archivos al hacer click en el boton', () => {
        cy.get('#subirDocumentoBtn').click()
        cy.get('input[type="file"]').should('be.visible')
    });
    it('Deberia encontrar los elementos de registrarse', () => {
        cy.get('#nombre').should('exist')
        cy.get('#especie').should('exist')
        cy.get('#raza').should('exist')
        cy.get('#sexo').should('exist')
        cy.get('#edad').should('exist')
        cy.get('#registrarBtn').should('exist')
    }); 
    it('Deberia ingresar texto en los campos de registrarse', () => {
        cy.get('#nombre').type('Firulais').should('have.value', 'Firulais')
        cy.get('#especie').type('Perro').should('have.value', 'Perro')
        cy.get('#raza').type('Labrador').should('have.value', 'Labrador')
        cy.get('#sexo').type('Macho').should('have.value', 'Macho')
        cy.get('#edad').type('3').should('have.value', '3')
    });
});