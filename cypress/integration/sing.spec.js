import {
  errorDisplay,
  navGive,
  waitStandard,
} from "../support/variables/general";
import {
  errorWrongPass,
  errorWrongUser,
  invalidCredential,
  passwordInput,
  signButton,
  signinResetBttn,
  usernameInput,
  validPassword,
  validUsername,
} from "../support/variables/sign";

describe("Test for signin/ signup view", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  it("Should be able to log in with correct credentials", () => {
    cy.loginUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
  });
  it("Should show error when logging in with incorrect username", () => {
    cy.loginUI(invalidCredential, validPassword);
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorWrongUser);
    cy.get(navGive, { timeout: waitStandard }).should("not.exist");
  });
  it("Should show error when logging in with incorrect password", () => {
    cy.loginUI(validUsername, invalidCredential);
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorWrongPass);
    cy.get(navGive, { timeout: waitStandard }).should("not.exist");
  });
  it("Should be able to reset credentials", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(usernameInput, { timeout: waitStandard }).type(invalidCredential);
    cy.get(passwordInput, { timeout: waitStandard }).type(invalidCredential);
    cy.get(signinResetBttn).click();
    cy.get(usernameInput, { timeout: waitStandard }).should("have.value", "");
    cy.get(passwordInput, { timeout: waitStandard }).should("have.value", "");
  });
});
