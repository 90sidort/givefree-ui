import {
  passwordInput,
  signButton,
  signinButton,
  usernameInput,
} from "../variables/sign";

Cypress.Commands.add("loginUI", (username, password) => {
  cy.visit("/");
  cy.get(signButton, { timeout: 30000 }).click();
  cy.url().should("include", "/signin");
  cy.get(usernameInput, { timeout: 30000 }).type(username);
  cy.get(passwordInput, { timeout: 30000 }).type(password);
  cy.get(signinButton, { timeout: 30000 }).click();
});
