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

Cypress.Commands.add("mockDB", () => {
  cy.request("POST", "http://localhost:4000/graphql", {
    operationName: null,
    variables: {},
    query: "mutation {\n  mockDb\n}\n",
  }).then((res) => {
    expect(res.body.data.mockDb).to.equal(true);
  });
});
