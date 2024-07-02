
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Carbonel')
        cy.get('#email').type('Douglas.carbonel@dwu.com.br')
        cy.get('#open-text-area').type('longText', { delay: 0 })
        cy.contains('button[type=submit]','Enviar').click()
       
})

Cypress.Commands.add('randomOptionFromDropDown', function(){

    cy.get('select option')
    .its('length', {log: false}).then(n =>{
        cy.get('#product').select(Cypress._.random(1, n - 1))
    })
})