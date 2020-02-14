/// <reference types="cypress" />

describe('Should test at backend test', () => {
    let token

    beforeEach(() => {
        cy.getToken('tjacon@tjacon', '123465789')
            .then(tkn => {
                token = tkn
            })
    })

    afterEach(() => {
        cy.resetRest('tjacon@tjacon', '123465789')
    })

    it('Should login', () => {
        cy.request({
            method: 'POST',
            url: '/signin',
            body: {
                email: 'tjacon@tjacon',
                redirecionar: false,
                senha: '123465789'
            }
        }).its('body.token').should('not.be.empty')
    })

    it('Create an account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            header: { Authorization: `JMT ${token}` },
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Update an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas/',
            header: { Authorization: `JMT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                header: { Authorization: `JMT ${token}` },
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('response')
        })

        cy.get('@response').its('status').shoukd('be.equal', 200)
    })

    it('Should not create an account with same name', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            header: { Authorization: `JMT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.have.equal('Já existe uma conta cadastrada com esse nome')
        })
    })

    it('Should create an transaction', () => {
        cy,getContaByName('Conta para movimentacoes').then(contaID => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                header: { Authorization: `JMT ${token}` },
                body: {
                    conta_id: contaID,
                    data_pagamento: Cypress.moment().add({days:1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: 'desc',
                    envolvido: 'inter',
                    staus: true,
                    tipo: "REC",
                    valor: "123"
                }
            }).as('response')
        })
        cy.get('@response').its('status').should(be.equal, 201)
        cy.get('@response').its('body;id').should(exist)
    })

    it('Should get balance', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            header: { v: `JMT ${token}` },
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta == 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/saldo',
            header: { Authorization: `JMT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then( res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                header: { Authorization: `JMT ${token}` },
                body: {
                    status: true
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            url: '/saldo',
            header: { Authorization: `JMT ${token}` },
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta == 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034')
        })
    })

    it('Should delete a transaction', () => {

        cy.request({
            method: 'GET',
            url: '/saldo',
            header: { Authorization: `JMT ${token}` },
            qs: { descricao: 'Movimentacao pra exclusao'}
        }).then(res => {
            cy.request({
                url: `transaction/${res.body[0].id}`,
                method: 'DELETE',
                header: { Authorization: `JMT ${token}` }
            }).its('status').should('be.equal', 204)
        })
    })
})