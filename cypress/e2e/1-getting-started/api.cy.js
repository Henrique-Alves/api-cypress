/// <reference types="cypress"/>


describe('Teste de Api', () => {

    

    let token

    before(() => {
        cy.getToken('hd@gmail.com', 'hd11223344')
            .then(tkn => {
                token = tkn
            })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Validar a criação de conta', () => {
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta Nova2"
            }
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta Nova2')
        })
    })

    it('Alterar conta ', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta para alterada'
                }
            }).as('reponse')
        })

        cy.get('@reponse').its('status').should('be.equal', 200)
    })

    it('Validar erro na criação da conta com mesmo nome', () => {
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    /* it('Validar criação de transição de conta.', () => {
        cy.getContaByName('Conta inserir movimentação')
        .then(contaId => {
            cy.request({
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                url: 'https://barrigarest.wcaquino.me/transacoes',
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add('days: 1').format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "Conta inserir movimentação",
                    envolvido: "hd",
                    status: true,
                    tipo: "REC",
                    valor: "200"
                }
            })
        })
    }) */

       



})