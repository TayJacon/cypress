
/// <reference types="cypress" />

describe('Working with iFrames', () => {

    it('Deve preencher o frame', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
        })
    })

    it('Deve preencher o frame corretamente', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK')
        })
    })
})