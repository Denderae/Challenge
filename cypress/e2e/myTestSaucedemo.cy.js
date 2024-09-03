describe('Test challenge', () => {
  beforeEach(() => { 
      cy.visit('https://www.saucedemo.com/')
      cy.clearAllLocalStorage();
          cy.clearAllSessionStorage();
          cy.clearAllCookies();
    })
  
    
    it('Prueba e2e con usuario valido', () => {
      cy.login('usuarioSinProblema')
      cy.get('[data-test=login-button]').click();
      cy.request('GET', 'https://www.saucedemo.com/icon-192x192.png').its('status').should('eq', 200);
      cy.log('Se valida estatus 200')
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
      cy.get('[data-test="error"]').should('have.css', 'color', 'rgb(255, 255, 255)')
    })
    })
