describe('Test challenge', () => {
  beforeEach(() => { 
      cy.visit('https://www.saucedemo.com/')
      cy.clearAllLocalStorage();
          cy.clearAllSessionStorage();
          cy.clearAllCookies();
    })
  
    
    it.only('Prueba e2e con usuario valido', () => {
      cy.login('usuarioSinProblema')
      cy.get('[data-test=login-button]').click();
      cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()
      cy.get('[data-test=add-to-cart-sauce-labs-bike-light]').click()
      cy.get('[data-test=shopping-cart-link]').click();
      cy.get('[data-test=checkout]').click()
      cy.checkoutForm('juan', 'sterling', '410004')
      cy.get('[data-test=continue]').click();
      cy.get('[data-test=finish]').click()
      cy.get('[data-test=complete-header]').should('contain', 'Thank you for your order!')
      cy.get('[data-test=back-to-products]').click()
    })
    
    it.only('Prueba e2e usuario con problema', () => {
      cy.login('usuarioConProblema')
      cy.get('[data-test=login-button]').click();
      cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()
      cy.get('[data-test=add-to-cart-sauce-labs-bike-light]').click()
      cy.get('[data-test=shopping-cart-link]').click();
      cy.get('[data-test=checkout]').click()
      cy.checkoutForm('juan', 'sterling', '410004')
      cy.get('[data-test=continue]').click();
      cy.get('[data-test=finish]').click()
      cy.get('[data-test=complete-header]').should('contain', 'Thank you for your order!')
      cy.get('[data-test=back-to-products]').click()
    })
    })



    // Valida envío de formulario vacío
    it('Validar envío de form vacío ,validacion de API respuesta 400', () => {
      cy.intercept('POST', 'https://automationintesting.online/message/').as('enviodeformvacio')
      cy.log('Envío de form de contacto en blanco...')
      cy.fixture('formValidation').then((data) => {
        cy.validarEnvioFormulario(data.formErrors, '@enviodeformvacio', 400)
      })
    })
  
    it('Validar envío de form con data incorrecta', () => {
        cy.log('Set de datos incorrectos...');
        cy.fillFormFromJsonFile('formValidation.json');
         cy.get('[data-testid="ContactDescription"]').type('asdasd');
        cy.get('#submitContact').click();
        cy.get('.alert').should('be.visible');
        cy.fixture('errorMessages.json').then((errors) => {
            errors.invalidFormErrors.forEach((errorMessage) => {
                cy.completP(errorMessage);
            });
        });
    });
   
    // Valida envío de formulario con datos correctos
    it('Debería llenar y enviar el formulario correctamente', () => {
      cy.intercept('POST', 'https://automationintesting.online/message/').as('enviodeformcorrecto')
      cy.fixture('formValidation').then((data) => {
        cy.llenarFormulario(data.formdatacorrecta)
        cy.wait('@enviodeformcorrecto').then((interception) => {
          expect(interception.response.statusCode).to.equal(201)
        })
      })
    })

