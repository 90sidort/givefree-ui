import "cypress-file-upload";
import {
  graphqlLink,
  waitStandard,
  prevPageButton,
  nextPageButton
} from "../variables/general";
import {
  passwordInput,
  signButton,
  signinButton,
  usernameInput
} from "../variables/sign";

Cypress.Commands.add("loginUI", (username, password) => {
  cy.visit("/");
  cy.get(signButton, { timeout: waitStandard }).click();
  cy.url().should("include", "/signin");
  cy.get(usernameInput, { timeout: waitStandard }).type(username);
  cy.get(passwordInput, { timeout: waitStandard }).type(password);
  cy.get(signinButton, { timeout: waitStandard }).click();
});

Cypress.Commands.add("loginNoUI", (username, password) => {
  cy.visit("/");
  cy.request("POST", graphqlLink, {
    operationName: "SIGN_IN",
    variables: { username, password },
    query:
      "mutation SIGN_IN($username: String!, $password: String!) {\n  signinUser(password: $password, username: $username)\n}\n"
  }).then(res => {
    cy.visit("/give");
  });
});

Cypress.Commands.add("mockDB", () => {
  cy.request("POST", graphqlLink, {
    operationName: null,
    variables: {},
    query: "mutation {\n  mockDb\n}\n"
  }).then(res => {
    expect(res.body.data.mockDb).to.equal(true);
  });
});

Cypress.Commands.add("checkPageBttn", (prevDisable, nextDisable) => {
  cy.get(prevPageButton, { timeout: waitStandard }).should(
    "have.attr",
    "aria-disabled",
    prevDisable
  );
  cy.get(nextPageButton, { timeout: waitStandard }).should(
    "have.attr",
    "aria-disabled",
    nextDisable
  );
});
