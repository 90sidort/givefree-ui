import {
  searchItemsInput,
  waitStandard,
  dropdownItem,
  searchItemImage,
  navGive,
  navGiven,
  sectionTaken,
  prevPageButton,
  nextPageButton
} from "../support/variables/general";

import {
  itemDetailsName,
  editItemButton,
  giveItemButton,
  deleteItemButton,
  itemLink,
  givenToPar,
  addToWishlistBttn
} from "../support/variables/item";

import { validUsername, validPassword } from "../support/variables/sign";

describe("Tests for given & taken views", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  it("Should be able to change pages back and forth (given)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.visit("/");
    cy.get(navGiven, { timeout: waitStandard }).click();
    cy.url().should("include", "/given");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/given/2");
    cy.checkPageBttn("false", "true");
    cy.get(prevPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/given/1");
    cy.checkPageBttn("true", "false");
  });
  it("Should be able to change pages back and forth (taken)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.visit("/");
    cy.get(sectionTaken, { timeout: waitStandard }).click();
    cy.url().should("include", "/taken");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/taken/2");
    cy.checkPageBttn("false", "true");
    cy.get(prevPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/taken/1");
    cy.checkPageBttn("true", "false");
  });
  it("Should display items with no options (given)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGiven, { timeout: waitStandard }).should("be.visible");
    cy.get(navGiven, { timeout: waitStandard }).click();
    cy.url().should("include", "/given");
    cy.get(editItemButton, { timeout: waitStandard }).should("not.exist");
    cy.get(giveItemButton, { timeout: waitStandard }).should("not.exist");
    cy.get(deleteItemButton, { timeout: waitStandard }).should("not.exist");
  });
  it("Should display items with no options (taken)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(sectionTaken, { timeout: waitStandard }).should("be.visible");
    cy.get(sectionTaken, { timeout: waitStandard }).click();
    cy.url().should("include", "/taken");
    cy.get(editItemButton, { timeout: waitStandard }).should("not.exist");
    cy.get(giveItemButton, { timeout: waitStandard }).should("not.exist");
    cy.get(deleteItemButton, { timeout: waitStandard }).should("not.exist");
  });
  it("Should be able to add item to wishlist from details (given)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(navGiven, { timeout: waitStandard }).click();
    cy.url().should("include", "/given");
    cy.get(itemLink, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(itemDetailsName, { timeout: waitStandard }).should("be.visible");
    cy.get(givenToPar, { timeout: waitStandard }).should("be.visible");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("not.exist");
  });
  it("Should be able to add item to wishlist from details (taken)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(navGiven, { timeout: waitStandard }).click();
    cy.url().should("include", "/given");
    cy.get(itemLink, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(itemDetailsName, { timeout: waitStandard }).should("be.visible");
    cy.get(givenToPar, { timeout: waitStandard }).should("be.visible");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("not.exist");
  });
});
