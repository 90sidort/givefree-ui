import {
  accountEditBttn,
  changeName,
  changeSurname,
  changeEmail,
  changeAbout,
  updateUserBttn,
  accountCancelBttn,
  aboutNormal,
  nameNormal,
  surnameNormal,
  changeNormal,
  emailChange,
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
    cy.checkAccount(
      validUsername,
      normalEmail,
      nameNormal,
      surnameNormal,
      aboutNormal
    );
  });
  it("Should be able to cancel account data changes", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navAccount, { timeout: waitStandard }).click();
    cy.url().should("include", "account");
    cy.get(accountEditBttn, { timeout: waitStandard }).click();
    cy.rewriteField(changeName, changeNormal);
    cy.rewriteField(changeSurname, changeNormal);
    cy.rewriteField(changeEmail, emailChange);
    cy.rewriteField(changeAbout, changeNormal);
    cy.get(accountCancelBttn, { timeout: waitStandard }).click();
    cy.checkAccount(
      validUsername,
      normalEmail,
      nameNormal,
      surnameNormal,
      aboutNormal
    );
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
    cy.rewriteField(changeName, changeNormal);
    cy.rewriteField(changeSurname, changeNormal);
    cy.rewriteField(changeEmail, emailChange);
    cy.rewriteField(changeAbout, changeNormal);
    cy.get(updateUserBttn, { timeout: waitStandard }).click();
    cy.checkAccount(
      validUsername,
      emailChange,
      changeNormal,
      changeNormal,
      changeNormal
    );
  });
});
