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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Comando para iniciar sesión
Cypress.Commands.add('login', (userType) => {
    cy.fixture('usuarios').then((users) => {
      const user = users[userType];
      cy.get('[data-test=username]').type(user.username);
      cy.get('[data-test=password]').type(user.password);
    });
  });
  
  // Comando para llenar formulario checkout
  Cypress.Commands.add('checkoutForm', (firstName, lastName, zipCode) => {
    cy.get('[data-test=firstName]').type(firstName);
    cy.get('[data-test=lastName]').type(lastName);
    cy.get('[data-test=postalCode]').type(zipCode);
    
  });
  
