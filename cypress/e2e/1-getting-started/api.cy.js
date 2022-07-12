/// <reference types="cypress"/>


describe('Teste de Api', () => {


     it('Validar criar conta', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: 'hd@gmail.com',
                redirecionar: 'false',
                senha: 'hd11223344'
            }
        }).its('body.token').should('contain',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzExMDJ9.c3ETRZxon2MAycFsMixsyWU91qKAzT3pP82RCx0uKeU')
            /* .then(token => {      
               cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers: { Autorization: `JWT ${token}`},
                body: {
                    nome: "Conta Nova"
                }
               }).then(res => console.log(res))
            }) */
    }) 


})