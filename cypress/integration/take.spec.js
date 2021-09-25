import {
  searchItemsInput,
  waitStandard,
  dropdownItem,
  searchItemImage,
  prevPageButton,
  nextPageButton,
  navGive,
  sectionWishlist
} from "../support/variables/general";

import {
  itemDetailsName,
  itemCard,
  itemDescription,
  catTag,
  itemLink,
  addToWishlistBttn,
  editItemButton,
  giveItemButton,
  deleteItemButton,
  wishlistCounter,
  wishlistItemTitle,
  removeFormWishlist
} from "../support/variables/item";
import { validUsername, validPassword } from "../support/variables/sign";

describe("Tests for take view", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  // it("Should display items and link to their descriptions(without signin)", () => {
  //   cy.visit("/");
  //   cy.get(itemCard, { timeout: waitStandard }).should("have.length", 16);
  //   cy.get(addToWishlistBttn, { timeout: waitStandard }).should("not.exist");
  //   cy.get(itemDescription, { timeout: waitStandard })
  //     .eq(3)
  //     .invoke("text")
  //     .should("include", "...");
  //   cy.get(catTag, { timeout: waitStandard })
  //     .eq(3)
  //     .invoke("text")
  //     .should("include", "COAT");
  //   cy.get(itemLink)
  //     .eq(3)
  //     .invoke("text")
  //     .should("include", "Programmable");
  //   cy.get(itemLink)
  //     .eq(3)
  //     .click();
  //   cy.url().should("include", "/item/11189");
  //   cy.get(itemDetailsName, { timeout: waitStandard })
  //     .should("be.visible")
  //     .invoke("text")
  //     .should("include", "Programmable");
  // });
  // it("Should be able to change pages back and forth (without signin)", () => {
  //   cy.visit("/");
  //   cy.checkPageBttn("true", "false");
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/2");
  //   cy.checkPageBttn("false", "false");
  //   cy.get(prevPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/1");
  //   cy.checkPageBttn("true", "false");
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/2");
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/6");
  //   cy.checkPageBttn("false", "true");
  // });
  // it("Should display items with options for logged users", () => {
  //   cy.loginNoUI(validUsername, validPassword);
  //   cy.get(navGive, { timeout: waitStandard }).should("be.visible");
  //   cy.visit("/");
  //   cy.get(addToWishlistBttn, { timeout: waitStandard })
  //     .should("be.visible")
  //     .should("have.length", 11);
  //   cy.get(editItemButton, { timeout: waitStandard })
  //     .should("be.visible")
  //     .should("have.length", 5);
  //   cy.get(giveItemButton, { timeout: waitStandard })
  //     .should("be.visible")
  //     .should("have.length", 5);
  //   cy.get(deleteItemButton, { timeout: waitStandard })
  //     .should("be.visible")
  //     .should("have.length", 5);
  //   cy.get(itemLink)
  //     .eq(3)
  //     .invoke("text")
  //     .should("include", "Programmable");
  //   cy.get(itemLink)
  //     .eq(3)
  //     .click();
  //   cy.url().should("include", "/item/11189");
  //   cy.get(itemDetailsName, { timeout: waitStandard })
  //     .should("be.visible")
  //     .invoke("text")
  //     .should("include", "Programmable");
  // });
  // it("Should be able to change pages back and forth (logged))", () => {
  //   cy.loginNoUI(validUsername, validPassword);
  //   cy.get(navGive, { timeout: waitStandard }).should("be.visible");
  //   cy.visit("/");
  //   cy.checkPageBttn("true", "false");
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/2");
  //   cy.checkPageBttn("false", "false");
  //   cy.get(prevPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/1");
  //   cy.checkPageBttn("true", "false");
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/2");
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.get(nextPageButton, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.url().should("include", "/items/6");
  //   cy.checkPageBttn("false", "true");
  // });
  // it("Should be able to add item to wishlist", () => {
  //   cy.intercept("POST", "**/graphql").as("request");
  //   cy.loginNoUI(validUsername, validPassword);
  //   cy.get(navGive, { timeout: waitStandard }).should("be.visible");
  //   cy.visit("/");
  //   cy.get(addToWishlistBttn, { timeout: waitStandard })
  //     .eq(0)
  //     .click();
  //   cy.wait("@request").then(interception =>
  //     expect(interception.response.body.data.addToWishlist).to.eq(true)
  //   );
  // cy.(wishlistCounter, { timeout: waitStandard }).should('have.text', '8')
  // });
  it("Should be able to remove item from wishlist", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(wishlistCounter, { timeout: waitStandard }).then(countOne => {
      const originalCount = countOne[0].innerText;
      cy.get(sectionWishlist, { timeout: waitStandard }).click();
      cy.get(wishlistItemTitle("discrete"), { timeout: waitStandard }).should(
        "exist"
      );
      cy.get(removeFormWishlist, { timeout: waitStandard })
        .eq(0)
        .click();
      cy.get(wishlistItemTitle("discrete"), { timeout: waitStandard }).should(
        "not.exist"
      );
      cy.get(wishlistCounter, { timeout: waitStandard }).then(countTwo => {
        const changedCount = countTwo[0].innerText;
        expect(changedCount).to.not.eq(originalCount);
      });
    });
  });
});
