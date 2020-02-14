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

Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: passwd
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})

Cypress.Commands.add('resetRest', (user, passwd) => {
    cy.getToken(user, passwd).then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            header: { Authorization: `JMT ${token}` },
        })
    })
})

Cypress.Commands.add('getContaByName', name => {
    cy.getToken('tjacon@tjacon', '123546789').then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            header: { Authorization: `JMT ${token}` },
            qs: {
                nome: name
            }
        }).then(res => {
            return res.body[0].id
        })
    })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length === 1) {
        if(Cypress.env('token')) {
            options[0].headers = {
                Authorization = `JWT ${Cypress.env('token')}`
            }
        }
    }

    return originalFn(...options)
})