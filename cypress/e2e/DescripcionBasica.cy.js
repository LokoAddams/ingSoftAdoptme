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
})