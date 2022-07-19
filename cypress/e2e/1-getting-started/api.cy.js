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

    it('Validar criar conta', () => {
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


})