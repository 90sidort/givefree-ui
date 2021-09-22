import {
  errorDisplay,
  navGive,
  waitStandard,
} from "../support/variables/general";
import {
  aboutInput,
  buttonSignup,
  emailInput,
  errorNonmatchPassword,
  errorWrongPass,
  errorWrongUser,
  invalidCredential,
  nameInput,
  passwordInput,
  resetPassRedirect,
  retypeInput,
  signButton,
  signinRedirect,
  signinResetBttn,
  signoutButton,
  signupRedirect,
  surnameInput,
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
  it("Should be able to go change forms in sign compomnent", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(signupRedirect, { timeout: waitStandard }).should("not.exist");
    cy.get(signinRedirect, { timeout: waitStandard }).click();
    cy.get(signinRedirect, { timeout: waitStandard }).should("not.exist");
    cy.get(resetPassRedirect, { timeout: waitStandard }).click();
    cy.get(resetPassRedirect, { timeout: waitStandard }).should("not.exist");
    cy.get(signinRedirect, { timeout: waitStandard }).click();
    cy.get(signinRedirect, { timeout: waitStandard }).should("not.exist");
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
  it("Should be able to log out", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(signoutButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
  });
  it("Should be able create an account with no about", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).type("brand_new_user");
    cy.get(nameInput, { timeout: waitStandard }).type("brand");
    cy.get(surnameInput, { timeout: waitStandard }).type("new_user");
    cy.get(emailInput, { timeout: waitStandard }).type("brandnew@test.com");
    cy.get(passwordInput, { timeout: waitStandard }).type(validPassword);
    cy.get(retypeInput, { timeout: waitStandard }).type(validPassword);
    cy.get(buttonSignup, { timeout: waitStandard }).click();
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
  });
  it("Should not be able create an account with nonmatching passwords", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).type("brand_new_user");
    cy.get(nameInput, { timeout: waitStandard }).type("brand");
    cy.get(surnameInput, { timeout: waitStandard }).type("new_user");
    cy.get(emailInput, { timeout: waitStandard }).type("brandnew@test.com");
    cy.get(passwordInput, { timeout: waitStandard }).type(validPassword);
    cy.get(retypeInput, { timeout: waitStandard }).type(invalidCredential);
    cy.get(buttonSignup, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorNonmatchPassword);
  });
  it("Should not be able create an account without mandatory data", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).type("brand_new_user");
    cy.get(nameInput, { timeout: waitStandard }).type("brand");
    cy.get(surnameInput, { timeout: waitStandard }).type("new_user");
    cy.get(emailInput, { timeout: waitStandard }).type("brandnew@test.com");
    cy.get(passwordInput, { timeout: waitStandard }).type(validPassword);
    cy.get(retypeInput, { timeout: waitStandard }).type(invalidCredential);
    cy.get(buttonSignup, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorNonmatchPassword);
  });
});
