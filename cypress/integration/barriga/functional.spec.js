/// <reference types="cypress" />

import locator from '../../support/locators'
import '../../support/commandsContas'

describe('Should test a functional level', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        cy.login('tjacon@tjacon', '123456789')
        cy.acessarMenuConta();
    })

    it('Should create an account', () => {
        cy.inserirConta('Conta de teste')
        cy.get(locator.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('SHould update an account', () => {
        cy.xpath(locator.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(locator.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(locator.CONTAS.BTN_SALVAR).click()
        cy.get(locator.MESSAGE).should('contain', 'Conta alterada com sucesso')
    })

    it.only('Should not creat an account with same name', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta duplicada')
        cy.inserirConta('Conta duplicada')
        cy.get(locator.MESSAGE).should('contain', 'code 400')

    })

    it.only('Should create a transaction', () => {
        cy.get(locator.MENU.MOVIMENTACAO).click()
        cy.get(locator.MOVIMENTACAO.DESCRIÇÃO).type('Desc')
        cy.get(locator.MOVIMENTACAO.VALOR).type('123')
        cy.get(locator.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(locator.MOVIMENTACAO.STATUS).click()
        cy.get(locator.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(locator.MESSAGE).should('contain', 'sucesso')
    })
})