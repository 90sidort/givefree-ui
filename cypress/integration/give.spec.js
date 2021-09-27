import {
  searchItemsInput,
  waitStandard,
  dropdownItem,
  searchItemImage,
  navGive,
  navTake,
  errorDisplay,
  navGiving
} from "../support/variables/general";

import {
  itemNameInput,
  pngExample,
  itemFileInput,
  itemStateSelect,
  itemCategorySelect,
  itemStatusSelect,
  itemDescriptionTextarea,
  addItemBttn,
  itemDetailsName,
  itemDetailsImage,
  errorUnauthorized,
  itemLink
} from "../support/variables/item";
import { validUsername, validPassword } from "../support/variables/sign";

describe("Tests for search give item functionality", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  // it("Should not be able to give items without login in", () => {
  //   cy.visit("/give");
  //   cy.get(itemNameInput, { timeout: waitStandard }).type("new shoes");
  //   cy.get(itemFileInput, { timeout: waitStandard }).attachFile(pngExample);
  //   cy.get(addItemBttn, { timeout: waitStandard }).click();
  //   cy.get(errorDisplay, { timeout: waitStandard })
  //     .invoke("text")
  //     .should("include", errorUnauthorized);
  // });
  // it("Should show given item in take & giving section", () => {
  //   cy.intercept("POST", "**/graphql").as("request");
  //   cy.loginNoUI(validUsername, validPassword);
  //   cy.get(navGive, { timeout: waitStandard }).click();
  //   cy.get(itemNameInput, { timeout: waitStandard }).type("new shoes");
  //   cy.get(itemFileInput, { timeout: waitStandard }).attachFile(pngExample);
  //   cy.get(addItemBttn, { timeout: waitStandard }).click();
  //   cy.wait("@request").then(interception => {
  //     expect(interception.response.body.data.addItem.name).to.eq("new shoes");
  //     cy.get(itemDetailsName, { timeout: waitStandard })
  //       .should("be.visible")
  //       .invoke("text")
  //       .should("include", "new shoes");
  //     cy.get(itemDetailsImage, { timeout: waitStandard }).should("be.visible");
  //     cy.url().should(
  //       "include",
  //       `/item/${interception.response.body.data.addItem.id}`
  //     );
  //     cy.get(navTake, { timeout: waitStandard }).click();
  //     cy.get(itemLink, { timeout: waitStandard })
  //       .eq(0)
  //       .invoke("text")
  //       .should("include", "new shoes");
  //     cy.get(navGiving, { timeout: waitStandard }).click();
  //     cy.get(itemLink, { timeout: waitStandard })
  //       .eq(0)
  //       .invoke("text")
  //       .should("include", "new shoes");
  //   });
  // });
  it("Should not show draft item in take section", () => {
    cy.intercept("POST", "**/graphql").as("request");
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).click();
    cy.get(itemNameInput, { timeout: waitStandard }).type("new socks");
    cy.get(itemFileInput, { timeout: waitStandard }).attachFile(pngExample);
    cy.get(itemStateSelect, { timeout: waitStandard }).select("NEW");
    cy.get(itemCategorySelect, { timeout: waitStandard }).select("SOCKS");
    cy.get(itemStatusSelect, { timeout: waitStandard }).select("DRAFT");
    cy.get(itemDescriptionTextarea, { timeout: waitStandard }).type(
      "Super description"
    );
    cy.get(addItemBttn, { timeout: waitStandard }).click();
    cy.wait("@request").then(interception => {
      expect(interception.response.body.data.addItem.name).to.eq("new socks");
      cy.get(itemDetailsName, { timeout: waitStandard })
        .should("be.visible")
        .invoke("text")
        .should("include", "new socks");
      cy.get(itemDetailsImage, { timeout: waitStandard }).should("be.visible");
      cy.url().should(
        "include",
        `/item/${interception.response.body.data.addItem.id}`
      );
      cy.get(navTake, { timeout: waitStandard }).click();
      cy.get(itemLink, { timeout: waitStandard })
        .eq(0)
        .invoke("text")
        .should("not.include", "new socks");
      cy.get(navGiving, { timeout: waitStandard }).click();
      cy.url().should("include", `/giving`);
      cy.get(itemLink, { timeout: waitStandard })
        .eq(0)
        .invoke("text")
        .should("include", "new socks");
    });
  });
});
