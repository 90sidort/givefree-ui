import {
  searchItemsInput,
  waitStandard,
  dropdownItem,
  searchItemImage,
  prevPageButton,
  nextPageButton
} from "../support/variables/general";

import {
  itemDetailsName,
  itemCard,
  itemDescription,
  catTag,
  itemLink
} from "../support/variables/item";
import { validUsername } from "../support/variables/sign";

describe("Tests for take view", () => {
  // before(() => {
  //   cy.mockDB().then(() => {
  //     cy.wait(500);
  //   });
  // });
  it("Should display items and link to their descriptions(without signin)", () => {
    cy.visit("/");
    cy.get(itemCard, { timeout: waitStandard }).should("have.length", 16);
    cy.get(itemDescription, { timeout: waitStandard })
      .eq(3)
      .invoke("text")
      .should("include", "...");
    cy.get(catTag, { timeout: waitStandard })
      .eq(3)
      .invoke("text")
      .should("include", "COAT");
    cy.get(itemLink)
      .eq(3)
      .invoke("text")
      .should("include", "Programmable");
    cy.get(itemLink)
      .eq(3)
      .click();
    cy.url().should("include", "/item/11189");
    cy.get(itemDetailsName, { timeout: waitStandard })
      .should("be.visible")
      .invoke("text")
      .should("include", "Programmable");
  });
  it("Should be able to change pages back and forth (without signin)", () => {
    cy.visit("/");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/items/2");
    cy.checkPageBttn("false", "false");
    cy.get(prevPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/items/1");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/items/2");
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/items/6");
    cy.checkPageBttn("false", "true");
  });
});
