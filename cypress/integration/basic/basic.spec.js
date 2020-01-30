/// <reference types="cypress" />

describe('Cypress basics', () => {

    it.only('Should visit a page and assert title', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        //another way
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')
        //another way

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        let syncTitle

        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)
            syncTitle = title
        })
        cy.get('[data-cy=dataSobrenome]').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })

    it('Should find and interact with and element', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple').click()
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')

        //another way
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})