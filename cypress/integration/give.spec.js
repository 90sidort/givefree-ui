import {
  searchItemsInput,
  waitStandard,
  dropdownItem,
  searchItemImage,
  navGive,
  navTake,
  errorDisplay,
  navGiving,
  modalElement,
  navGiven
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
  itemLink,
  errorName,
  errorDesc,
  imagePlaceholder,
  itemCard,
  addItemReq,
  editItemButton,
  updateItemBttn,
  deleteItemButton,
  confirmBttn,
  giveItemButton,
  possibleTakersH3,
  noTakerPar,
  closeWisherBttn,
  acceptUserOffer,
  givenToPar
} from "../support/variables/item";
import { validUsername, validPassword } from "../support/variables/sign";

describe("Tests for give item functionalities", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  it("Should not be able to give items without login in", () => {
    cy.visit("/give");
    cy.get(itemNameInput, { timeout: waitStandard }).type("new shoes");
    cy.get(itemFileInput, { timeout: waitStandard }).attachFile(pngExample);
    cy.get(addItemBttn, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorUnauthorized);
  });
  it("Should not be able to give items without mandatory data", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).click();
    cy.get(addItemBttn, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorName);
  });
  it("Should not be able to give items without invalid nonmandatory data", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).click();
    cy.get(itemNameInput, { timeout: waitStandard }).type("new shoes");
    cy.get(itemDescriptionTextarea, { timeout: waitStandard }).type("abc");
    cy.get(addItemBttn, { timeout: waitStandard }).click();
    cy.get(errorDisplay, { timeout: waitStandard })
      .invoke("text")
      .should("include", errorDesc);
  });
  it("Should show given item in take & giving section", () => {
    cy.intercept("POST", "**/graphql").as("request");
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).click();
    cy.get(itemNameInput, { timeout: waitStandard }).type("new shoes");
    cy.get(itemFileInput, { timeout: waitStandard }).attachFile(pngExample);
    cy.get(addItemBttn, { timeout: waitStandard }).click();
    cy.wait("@request").then(interception => {
      expect(interception.response.body.data.addItem.name).to.eq("new shoes");
      cy.get(itemDetailsName, { timeout: waitStandard })
        .should("be.visible")
        .invoke("text")
        .should("include", "new shoes");
      cy.get(itemDetailsImage, { timeout: waitStandard }).should("be.visible");
      cy.url().should(
        "include",
        `/item/${interception.response.body.data.addItem.id}`
      );
      cy.get(navTake, { timeout: waitStandard }).click();
      cy.get(itemLink, { timeout: waitStandard })
        .eq(0)
        .invoke("text")
        .should("include", "new shoes");
      cy.get(navGiving, { timeout: waitStandard }).click();
      cy.get(itemLink, { timeout: waitStandard })
        .eq(0)
        .invoke("text")
        .should("include", "new shoes");
    });
  });
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
  it("Should be able to give item without image", () => {
    cy.intercept("POST", "**/graphql").as("request");
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).click();
    cy.get(itemNameInput, { timeout: waitStandard }).type("new shoes");
    cy.get(addItemBttn, { timeout: waitStandard }).click();
    cy.get(itemDetailsImage, { timeout: waitStandard }).should("not.exist");
    cy.get(navTake, { timeout: waitStandard }).click();
    cy.get(itemLink, { timeout: waitStandard })
      .eq(0)
      .invoke("text")
      .should("include", "new shoes");
    cy.get(itemCard, { timeout: waitStandard }).children(imagePlaceholder);
  });
  it("Should be able to edit created item", () => {
    cy.loginNoUI(validUsername, validPassword).then(res => {
      const token = res.document.cookie.split("token=")[1];
      cy.request({
        method: "POST",
        url: "http://localhost:4000/graphql",
        body: { ...addItemReq },
        headers: { token }
      }).then(() => {
        cy.visit("/give");
        cy.get(navTake, { timeout: waitStandard }).click();
        cy.url().should("include", `/items`);
        cy.get(editItemButton, { timeout: waitStandard })
          .eq(0)
          .click();
        cy.get(itemNameInput, { timeout: waitStandard }).type("changed");
        cy.get(updateItemBttn, { timeout: waitStandard }).click();
        cy.get(itemDetailsName, { timeout: waitStandard })
          .invoke("text")
          .should("include", "changed");
        cy.get(navTake, { timeout: waitStandard }).click();
        cy.get(itemLink, { timeout: waitStandard })
          .eq(0)
          .invoke("text")
          .should("include", "changed");
      });
    });
  });
  it("Should be able to delete created item", () => {
    const itemTBDeleted = { ...addItemReq };
    itemTBDeleted.variables.item.name = "toBeDeleted";
    cy.loginNoUI(validUsername, validPassword).then(res => {
      const token = res.document.cookie.split("token=")[1];
      cy.request({
        method: "POST",
        url: "http://localhost:4000/graphql",
        body: { ...itemTBDeleted },
        headers: { token }
      }).then(() => {
        cy.visit("/give");
        cy.get(navTake, { timeout: waitStandard }).click();
        cy.url().should("include", `/items`);
        cy.get(itemLink, { timeout: waitStandard })
          .eq(0)
          .invoke("text")
          .should("include", "toBeDeleted");
        cy.get(deleteItemButton, { timeout: waitStandard })
          .eq(0)
          .click();
        cy.get(modalElement, { timeout: waitStandard }).should("be.visible");
        cy.get(confirmBttn, { timeout: waitStandard }).click();
        cy.get(modalElement, { timeout: waitStandard }).should("not.exist");
        cy.wait(500);
        cy.get(itemLink, { timeout: waitStandard })
          .eq(0)
          .invoke("text")
          .should("not.include", "toBeDeleted");
      });
    });
  });
  it("Should show no takers if nobody added item to wishlist", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.visit("/items");
    cy.get('button[id="11219"]', { timeout: waitStandard }).click();
    cy.get(possibleTakersH3, { timeout: waitStandard }).should("be.visible");
    cy.get(noTakerPar, { timeout: waitStandard })
      .invoke("text")
      .should("include", "No possible takers");
    cy.get(closeWisherBttn, { timeout: waitStandard }).click();
    cy.get(possibleTakersH3, { timeout: waitStandard }).should(
      "not.be.visible"
    );
  });
  it("Should be able to give item to possible taker", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.visit("/items");
    cy.get('button[id="11220"]', { timeout: waitStandard }).click();
    cy.get(possibleTakersH3, { timeout: waitStandard }).should("be.visible");
    cy.get(acceptUserOffer, { timeout: waitStandard }).should("have.length", 5);
    cy.get(acceptUserOffer, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(closeWisherBttn, { timeout: waitStandard }).click();
    cy.get('button[id="11220"]', { timeout: waitStandard }).should("not.exist");
    cy.get(navGiven).click();
    cy.url().should("include", `/given`);
    cy.get(itemLink, { timeout: waitStandard })
      .eq(0)
      .invoke("text")
      .should("include", "Super extra shorts two!");
    cy.get(itemLink, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(givenToPar, { timeout: waitStandard })
      .eq(0)
      .invoke("text")
      .should("include", "Given to: bfyfe3c");
  });
});
