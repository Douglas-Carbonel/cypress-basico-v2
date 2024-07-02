/// <reference types="Cypress" />

//const { isEmpty } = require("cypress/types/lodash")

/// const { delay } = require("cypress/types/bluebird")


describe('Central de Atendimento ao Cliente TAT', function () {
    //sempre vai executar o before antes de rodar cada teste, então sempre vai garantir que ele visite a pagina certa.
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.visit('./src/index.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Carbonel')
        cy.get('#email').type('Douglas.carbonel@dwu.com.br')
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec justo euismod, lacinia urna at, vestibulum nunc. Sed euismod, libero vel aliquet tincidunt, odio justo tincidunt turpis, vel tincidunt justo nisi in nunc. Sed euismod, libero vel aliquet tincidunt, odio justo tincidunt turpis, vel tincidunt justo nisi in nunc. Sed euismod, libero vel aliquet tincidunt, odio justo tincidunt turpis, vel tincidunt justo nisi in nunc. Sed euismod, libero vel aliquet tincidunt, odio justo tincidunt turpis, vel tincidunt justo nisi in nunc.'
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button[type=submit]', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })


    it('Exibe mennsagem de erro ao subter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Carbonel')
        cy.get('#email').type('1234')
        cy.get('#open-text-area').type('longText', { delay: 0 })
        cy.contains('button[type=submit]', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('validação de telefone apos digitar valor invalido', function () {
        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Carbonel')
        cy.get('#phone').type('Douglas').should('not.have.value')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Carbonel')
        cy.get('#email').type('1234.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('longText', { delay: 0 })
        cy.contains('button[type=submit]', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {

        cy.get('#firstName')
            .type('Douglas')
            .should('have.value', 'Douglas')
            .clear()
            .should('not.have.value')

        cy.get('#lastName')
            .type('Carbonel')
            .should('have.value', 'Carbonel')
            .clear()
            .should('not.have.value')

        cy.get('#phone')
            .type('55983453300')
            .should('have.value', '55983453300')
            .clear()
            .should('not.have.value')


    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.visit('./src/index.html')

        cy.contains('button[type=submit]', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function () {

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {

        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', function () {

        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {

        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('teste doideira', function () {

        cy.randomOptionFromDropDown()

    })

    it('marca o tipo de atendimento "Feedback"', function () {

        cy.get('input[type = "radio"]').check('feedback')
            .should('have.value', 'feedback')
        //outra maneira
        // cy.get('input[type = "radio"] [value= "ajuda"]').check()
        // .should('be.checked')

    })

    it('marca cada tipo de atendimento"', function () {

        cy.get('input[type = "radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

            })

    })


    it('marca ambos checkboxes, depois desmarca o último', function () {

        cy.get('input[type = checkbox]').check()
            .should('be.checked')
            .last().uncheck()
            .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.visit('./src/index.html')
        cy.get('input[type = file]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('seleciona um arquivo simulando rag-and-drop', function () {
        cy.get('input[type = "file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {

        cy.fixture('example').as('sampleFile')
        cy.get('input[type = "file"]')
            .selectFile('@sampleFile')

    })

})
