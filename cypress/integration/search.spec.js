import {
  searchItemsInput,
  waitStandard,
  dropdownItem,
  searchItemImage
} from "../support/variables/general";

import { itemDetailsName } from "../support/variables/item";
import { validUsername } from "../support/variables/sign";

describe("Tests for search items functionality", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  it("Should be able to search items without login in", () => {
    cy.visit("/");
    cy.get(searchItemsInput, { timeout: waitStandard }).type("rad");
    cy.get(dropdownItem, { timeout: waitStandard })
      .should("be.visible")
      .should("not.have.text", "Needs at least three characters");
    cy.get(searchItemImage, { timeout: waitStandard }).should("have.length", 2);
    cy.get(searchItemImage, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/item");
    cy.get(itemDetailsName, { timeout: waitStandard })
      .should("be.visible")
      .invoke("text")
      .should("include", "radical");
  });
  it("Should show message when user searches with less than 3 letters ", () => {
    cy.visit("/");
    cy.get(searchItemsInput, { timeout: waitStandard }).type("ra");
    cy.get(dropdownItem, { timeout: waitStandard })
      .should("be.visible")
      .should("have.text", "Needs at least three characters");
  });
  it("Should show message when user search query does not match any items", () => {
    cy.visit("/");
    cy.get(searchItemsInput, { timeout: waitStandard }).type(validUsername);
    cy.get(dropdownItem, { timeout: waitStandard })
      .should("be.visible")
      .should("have.text", `No results for ${validUsername}`);
  });
});
