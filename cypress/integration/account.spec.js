import {
  usernamPar,
  emailPar,
  firstNamePar,
  lastNamePar,
  aboutPar,
  accountEditBttn,
  changeName,
  changeSurname,
  changeEmail,
  changeAbout,
  updateUserBttn,
  accountCancelBttn,
} from "../support/variables/account";

import {
  validUsername,
  validPassword,
  normalEmail,
} from "../support/variables/sign";

import {
  navAccount,
  waitStandard,
  errorDisplay,
} from "../support/variables/general";

describe("Tests for give account view", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  it("Should be able to read account data", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navAccount, { timeout: waitStandard }).click();
    cy.url().should("include", "account");
    cy.get(usernamPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", validUsername);
    cy.get(emailPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", normalEmail);
    cy.get(firstNamePar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "Normal");
    cy.get(lastNamePar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "User");
    cy.get(aboutPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", " I am a regular user,");
  });
  it("Should be able to cancel account data changes", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navAccount, { timeout: waitStandard }).click();
    cy.url().should("include", "account");
    cy.get(accountEditBttn, { timeout: waitStandard }).click();
    cy.get(changeName, { timeout: waitStandard }).clear();
    cy.get(changeName, { timeout: waitStandard }).type("Changed");
    cy.get(changeSurname, { timeout: waitStandard }).clear();
    cy.get(changeSurname, { timeout: waitStandard }).type("Changed");
    cy.get(changeEmail, { timeout: waitStandard }).clear();
    cy.get(changeEmail, { timeout: waitStandard }).type("changed@test.com");
    cy.get(changeAbout, { timeout: waitStandard }).clear();
    cy.get(changeAbout, { timeout: waitStandard }).type("Changed description");
    cy.get(accountCancelBttn, { timeout: waitStandard }).click();
    cy.get(usernamPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", validUsername);
    cy.get(emailPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", normalEmail);
    cy.get(firstNamePar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "Normal");
    cy.get(lastNamePar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "User");
    cy.get(aboutPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", " I am a regular user,");
  });
  it("Should not be able to change account data to invalid", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navAccount, { timeout: waitStandard }).click();
    cy.url().should("include", "account");
    cy.get(accountEditBttn, { timeout: waitStandard }).click();
    cy.get(changeName, { timeout: waitStandard }).clear();
    cy.get(changeName, { timeout: waitStandard }).type("c");
    cy.get(updateUserBttn, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", "Name has to be bewteen 2 and 200 characters long!");
  });
  it("Should be able to change account data", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navAccount, { timeout: waitStandard }).click();
    cy.url().should("include", "account");
    cy.get(accountEditBttn, { timeout: waitStandard }).click();
    cy.get(changeName, { timeout: waitStandard }).clear();
    cy.get(changeName, { timeout: waitStandard }).type("Changed");
    cy.get(changeSurname, { timeout: waitStandard }).clear();
    cy.get(changeSurname, { timeout: waitStandard }).type("Changed");
    cy.get(changeEmail, { timeout: waitStandard }).clear();
    cy.get(changeEmail, { timeout: waitStandard }).type("changed@test.com");
    cy.get(changeAbout, { timeout: waitStandard }).clear();
    cy.get(changeAbout, { timeout: waitStandard }).type("Changed description");
    cy.get(updateUserBttn, { timeout: waitStandard }).click();
    cy.get(emailPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "changed@test.com");
    cy.get(firstNamePar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "Changed");
    cy.get(lastNamePar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "Changed");
    cy.get(aboutPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", " Changed description");
  });
});
