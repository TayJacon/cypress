// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import locator from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, pwd) => {
    cy.get(locator.LOGIN.USER).type(user)
    cy.get(locator.LOGIN.PASSWORD).type(pwd)
    cy.get(locator.LOGIN.BTN_LOGIN).click()
    cy.get(locator.MESSAGE).should('contain', 'Bem vindo, tjacon!')
})

Cypress.Commands.add('reserApp', () => {
    cy.get(locator.MENU.SETTING)
    cy.get(locator.MENU.RESET)
})