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
  navGiven,
  sectionWishlist,
  sectionTaken,
  nextPageButton,
  prevPageButton
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
  giveItemReq,
  editItemButton,
  updateItemBttn,
  deleteItemButton,
  confirmBttn,
  giveItemButton,
  possibleTakersH3,
  noTakerPar,
  closeWisherBttn,
  acceptUserOffer,
  givenToPar,
  wishlistItemTitle
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
          cy.visit("/given");
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
});
