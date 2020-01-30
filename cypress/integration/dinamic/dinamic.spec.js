/// <reference types="cypress" />

describe('Cadastro com comida variada', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    const foods = ['carne', 'frango', 'pizza', 'vegetariano']

    foods.forEach(food => {
        it(`Cadastro com a comida ${food}`, function () {
            cy.fixture('userData').as('usuario').then(() => {
                cy.get('#formNome').type(this.usuario.nome)
                cy.get('#formSobrenome').type(this.usuario.sobrenome)
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
                cy.get(`[name=formComidaFavorita][value=${food}]`).click()
                cy.get('#formEscolaridade').select(this.usuario.escolaridade)
                cy.get('#formEsportes').select(this.usuario.esporte)
                cy.get('#formCadastrar').click()
                cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
            })
        })
    })

    it.only('Deve selecionar todos usando each', () => [
        cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita]`).each($el => {
                cy.wrap($el).click()
            })
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esporte)
            
            cy.clickAlert('#formCadastrar', 'Tem certeza que você eh vegetariano')
        })
    ])
})