import {
  errorDisplay,
  navGive,
  waitStandard,
} from "../support/variables/general";
import {
  buttonSignup,
  emailInput,
  errorEmailExists,
  errorMissingUsername,
  errorNonexistUser,
  errorNonmatchPassword,
  errorUserExists,
  errorWrongPass,
  errorWrongUser,
  invalidCredential,
  nameInput,
  normalEmail,
  passwordInput,
  resetPassBttn,
  resetPassRedirect,
  retypeInput,
  signButton,
  signinRedirect,
  signinResetBttn,
  signoutButton,
  signupRedirect,
  successResetP,
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
    cy.visit("/give");
    cy.url().should("include", "/give");
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
  it("Should not be able to create an account with username that already exists", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).type(validUsername);
    cy.get(nameInput, { timeout: waitStandard }).type("brand");
    cy.get(surnameInput, { timeout: waitStandard }).type("new_user");
    cy.get(emailInput, { timeout: waitStandard }).type("brandnew@test.com");
    cy.get(passwordInput, { timeout: waitStandard }).type(validPassword);
    cy.get(retypeInput, { timeout: waitStandard }).type(validPassword);
    cy.get(buttonSignup, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorUserExists(validUsername));
  });
  it("Should not be able to create an account with email that already exists", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).type(validPassword);
    cy.get(nameInput, { timeout: waitStandard }).type("brand");
    cy.get(surnameInput, { timeout: waitStandard }).type("new_user");
    cy.get(emailInput, { timeout: waitStandard }).type(normalEmail);
    cy.get(passwordInput, { timeout: waitStandard }).type(validPassword);
    cy.get(retypeInput, { timeout: waitStandard }).type(validPassword);
    cy.get(buttonSignup, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorEmailExists(normalEmail));
  });
  it("Should not be able to create an account with invalid data", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).type("a");
    cy.get(nameInput, { timeout: waitStandard }).type("brand");
    cy.get(surnameInput, { timeout: waitStandard }).type("new_user");
    cy.get(emailInput, { timeout: waitStandard }).type(normalEmail);
    cy.get(passwordInput, { timeout: waitStandard }).type(validPassword);
    cy.get(retypeInput, { timeout: waitStandard }).type(validPassword);
    cy.get(buttonSignup, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorMissingUsername);
  });
  it("Should be able to reset fields in account creation form", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(signupRedirect, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).type("a");
    cy.get(nameInput, { timeout: waitStandard }).type("brand");
    cy.get(surnameInput, { timeout: waitStandard }).type("new_user");
    cy.get(emailInput, { timeout: waitStandard }).type(normalEmail);
    cy.get(passwordInput, { timeout: waitStandard }).type(validPassword);
    cy.get(retypeInput, { timeout: waitStandard }).type(validPassword);
    cy.get(signinResetBttn, { timeout: waitStandard }).click();
    cy.get(usernameInput, { timeout: waitStandard }).should("have.value", "");
    cy.get(nameInput, { timeout: waitStandard }).should("have.value", "");
    cy.get(surnameInput, { timeout: waitStandard }).should("have.value", "");
    cy.get(emailInput, { timeout: waitStandard }).should("have.value", "");
    cy.get(passwordInput, { timeout: waitStandard }).should("have.value", "");
    cy.get(retypeInput, { timeout: waitStandard }).should("have.value", "");
  });
  it("Should be able to request password reset", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(resetPassRedirect, { timeout: waitStandard }).click();
    cy.get(resetPassRedirect, { timeout: waitStandard }).should("not.exist");
    cy.get(emailInput, { timeout: waitStandard }).type(normalEmail);
    cy.get(resetPassBttn, { timeout: waitStandard }).click();
    cy.get(successResetP, { timeout: waitStandard }).should("be.visible");
  });
  it("Should not be able to request password reset if user does not exist", () => {
    cy.visit("/");
    cy.get(signButton, { timeout: waitStandard }).click();
    cy.url().should("include", "/signin");
    cy.get(resetPassRedirect, { timeout: waitStandard }).click();
    cy.get(resetPassRedirect, { timeout: waitStandard }).should("not.exist");
    cy.get(emailInput, { timeout: waitStandard }).type("nonexists@email.com");
    cy.get(resetPassBttn, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorNonexistUser);
  });
});
