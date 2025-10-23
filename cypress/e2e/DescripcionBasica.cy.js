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
})