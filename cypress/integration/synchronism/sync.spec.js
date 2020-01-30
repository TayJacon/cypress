/// <reference types="cypress" />

describe('Working with elements', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve esperar o elemento ficar disponível', () =>{
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retrys', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span').should('contain', 'Item 2')

        
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span').should('contain', 'Item 2')
    })

    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', {timeout: 1000}).should('exist')
        cy.get('#novoCampo').should('exist')

        cy.get('#buttonListDOM').click()
        cy.wait(3000)
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    it.only('Should vs then', () => {
        cy.get('#buttonListDOM').click()
        //wait load
        cy.get('#lista li span').then($el => {
            console.log($el)
            expect($el).to.have.length(1)
        })

        cy.get('#lista li span').should($el => {
            console.log($el)
            expect($el).to.have.length(1)
        })
        
        cy.get('#buttonListDOM').then($elem => {
            expect($elem).to.have.length(1)
            return 2
        }).and('have.id', 'buttonListDOM')
        
        cy.get('#buttonListDOM').should($elem => {
            expect($elem).to.have.length(1)
            return 2
        }).and('have.id', 'buttonListDOM')
    })
})