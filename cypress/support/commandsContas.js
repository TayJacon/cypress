import locator from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(locator.MENU.SETTING).click()
    cy.get(locator.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', conta => {
    cy.get(locator.CONTAS.NOME).type(conta)
    cy.get(locator.CONTAS.BTN_SALVAR).click()
})