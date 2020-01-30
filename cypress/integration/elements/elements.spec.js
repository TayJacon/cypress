/// <reference types="cypress" />

describe('Working with elements', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
    })

    it('Links', () => {
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.text', 'Status: Nao cadastrado')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () => {
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('[data-cy=dataSobrenome]')
            .type('Test12345{backspace}')
            .should('have.value', 'Test1234')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', {delay: 100})
            .should('have.value', 'acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length', 2)            
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')     
            
        cy.get('[name=formComidaFavorita]')
            .click({multiple:true})

        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaCarne').should('be.checked')
    })

    it.only('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')
            
        cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })

        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida'])
        
        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equals(['natacao', 'Corrida'])
        })
})