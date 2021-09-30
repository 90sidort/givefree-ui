import {
  waitStandard,
  navTake,
  navGiving,
  navGive,
  modalElement,
  navGiven,
  sectionWishlist,
  sectionTaken,
  nextPageButton,
  prevPageButton
} from "../support/variables/general";

import {
  itemNameInput,
  itemDetailsName,
  itemLink,
  giveItemReq,
  editItemButton,
  updateItemBttn,
  deleteItemButton,
  confirmBttn,
  possibleTakersH3,
  closeWisherBttn,
  acceptUserOffer,
  givenToPar,
  wishlistItemTitle,
  addItemReq,
  addToWishlistBttn,
  giveItemButton
} from "../support/variables/item";

import {
  validUsername,
  validPassword,
  signoutReq,
  itemOwner
} from "../support/variables/sign";

describe("Tests for search the rest of item functionalities", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  it("Should remove from wishlist and move it to taken when user recives item", () => {
    cy.loginNoUI(itemOwner, validPassword).then(res => {
      const token = res.document.cookie.split("token=")[1];
      cy.request({
        method: "POST",
        url: "http://localhost:4000/graphql",
        body: { ...giveItemReq },
        headers: { token }
      }).then(() => {
        cy.request({
          method: "POST",
          url: "http://localhost:4000/graphql",
          body: { ...signoutReq },
          headers: { token }
        }).then(() => {
          cy.loginNoUI(validUsername, validPassword);
          cy.get(navGiving, { timeout: waitStandard }).click();
          cy.get(sectionWishlist, { timeout: waitStandard }).click();
          cy.get(wishlistItemTitle("radical"), {
            timeout: waitStandard
          }).should("not.exist");
          cy.get(sectionTaken, { timeout: waitStandard }).click();
          cy.url().should("include", "/taken");
          cy.get(itemLink, { timeout: waitStandard })
            .eq(0)
            .invoke("text")
            .should("include", "radical");
        });
      });
    });
  });
  it("Should be able to edit item (giving section)", () => {
    cy.loginNoUI(validUsername, validPassword).then(res => {
      const token = res.document.cookie.split("token=")[1];
      cy.request({
        method: "POST",
        url: "http://localhost:4000/graphql",
        body: { ...addItemReq },
        headers: { token }
      }).then(() => {
        cy.visit("/give");
        cy.get(navGiving, { timeout: waitStandard }).click();
        cy.url().should("include", `/giving`);
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
  it("Should be able to delete created item (giving section)", () => {
    const itemTBDeleted = { ...addItemReq };
    itemTBDeleted.variables.item.name = "toBeDeleted";
    cy.loginNoUI(validUsername, validPassword).then(res => {
      const token = res.document.cookie.split("token=")[1];
      cy.request({
        method: "POST",
        url: "http://localhost:4000/graphql",
        body: { ...addItemReq },
        headers: { token }
      }).then(() => {
        cy.visit("/give");
        cy.get(navGiving, { timeout: waitStandard }).click();
        cy.url().should("include", `/giving`);
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
  it("Should be able to give item to possible taker (giving section)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGiving, { timeout: waitStandard }).click();
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
  it("Should be able to change pages back and forth (giving))", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.visit("/");
    cy.get(navGiving, { timeout: waitStandard }).click();
    cy.url().should("include", "/giving");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/giving/2");
    cy.checkPageBttn("false", "true");
    cy.get(prevPageButton, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.url().should("include", "/giving/1");
    cy.checkPageBttn("true", "false");
  });
  it("Should display items with options (giving)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(navGiving, { timeout: waitStandard }).click();
    cy.url().should("include", "/giving");
    cy.get(editItemButton, { timeout: waitStandard })
      .should("be.visible")
      .should("have.length", 16);
    cy.get(giveItemButton, { timeout: waitStandard })
      .should("be.visible")
      .should("have.length", 16);
    cy.get(deleteItemButton, { timeout: waitStandard })
      .should("be.visible")
      .should("have.length", 16);
  });
  it("Should be able to access item details (giving)", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(navGiving, { timeout: waitStandard }).click();
    cy.url().should("include", "/giving");
    cy.get(itemLink, { timeout: waitStandard })
      .eq(0)
      .click();
    cy.get(itemDetailsName, { timeout: waitStandard }).should("be.visible");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("not.exist");
  });
});
